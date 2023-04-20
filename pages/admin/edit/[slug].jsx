import { useEffect, useRef, useState } from "react";
import React from "react";
import client from "../../../apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import DashboardLayout from "../../../components/DashboardLayout";
import {
  SortableContext,
  useDroppable,
  useDraggable,
  verticalListSortingStrategy,
} from "@dnd-kit/core";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      {
        categories {
          slug
          title
        }
      }
    `,
  });

  console.log(data);
  return {
    paths: data.categories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const { data: imagesData } = await client.query({
    query: gql`
      query ImagesBySlug($slug: String!) {
        images(where: { category: { slug: $slug } }) {
          title
          id
          image {
            url
            height
            width
          }
          category {
            title
            id
          }
        }
      }
    `,
    variables: { slug },
  });

  const { data: videosData } = await client.query({
    query: gql`
      {
        videos(where: { category: { title_contains: "videography" } }) {
          title
          id
          description {
            html
          }
          embedUrl
        }
      }
    `,
  });

  const { data: categoriesData } = await client.query({
    query: gql`
      query Categories {
        categories(orderBy: listOrder_ASC) {
          title
          id
          slug
        }
      }
    `,
  });
  const categories = categoriesData.categories;
  const images = imagesData.images;
  const videos = videosData.videos;
  const category = images.length > 0 ? images[0].category : null;
  const categoryTitle = category ? category.title : "videography";

  return {
    props: {
      images,
      videos,
      categoryTitle,
      category,
      categories,
    },
    revalidate: 86400,
  };
}

export default function EditGallery({
  images,
  category,
  categories,
  categoryTitle,
  videos,
}) {
  const [imageOrder, setImageOrder] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = imageOrder.indexOf(active.id);
      const newIndex = imageOrder.indexOf(over.id);

      const newImageOrder = [...imageOrder];
      newImageOrder.splice(oldIndex, 1);
      newImageOrder.splice(newIndex, 0, active.id);

      setImageOrder(newImageOrder);
    }
  };

  if (categoryTitle === "videography") {
    return (
      <DashboardLayout categories={categories}>
        <div>
          {" "}
          <h1 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
            videography gallery
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:m-[2rem] m-4 ">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex flex-col justify-start items-center text-center "
              >
                <iframe
                  className=" w-[100%]"
                  width="560"
                  height="315"
                  src={video.embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>

                <h1 className="pt-4 mx-4 text-xl uppercase font-semibold tracking-wider">
                  {video.title}
                </h1>
                <p
                  className="mx-2 lg:mx-8 my-2 tracking-wide"
                  dangerouslySetInnerHTML={{ __html: video.description.html }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout categories={categories}>
        <div>
          <h1 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
            {category.title}
          </h1>

          <SortableContext
            items={images}
            strategy={verticalListSortingStrategy}
          >
            <div className="images md:columns-2 lg:columns-4 gap-2 my-[2rem] mx-2">
              {images.map((image) => {
                const { attributes, listeners, setNodeRef } = useDraggable({
                  id: image.id,
                });

                const { isOver, setNodeRef: setDroppableNodeRef } =
                  useDroppable({
                    id: image.id,
                  });

                return (
                  <div
                    key={image.id}
                    ref={setNodeRef}
                    className={`${
                      isOver ? "bg-gray-200" : ""
                    } flex flex-col justify-center items-center`}
                    {...listeners}
                    {...attributes}
                  >
                    <Image
                      src={image.image.url}
                      width={image.image.width}
                      height={image.image.height}
                      alt="#"
                      className="mb-2"
                    />
                    <div ref={setDroppableNodeRef}>
                      <p>{image.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SortableContext>
        </div>
      </DashboardLayout>
    );
  }
}
