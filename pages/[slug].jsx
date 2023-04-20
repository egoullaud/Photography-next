import { useEffect, useRef, useState } from "react";
import React from "react";
import client from "../apolloClient";
import Image from "next/image";
import Layout from "../components/Layout";
import {
  CATEGORIES_QUERY,
  IMAGES_BY_SLUG,
  VIDEOS_BY_CAT,
} from "../services/queries";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: CATEGORIES_QUERY,
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
    query: IMAGES_BY_SLUG,
    variables: { slug },
  });

  const { data: videosData } = await client.query({
    query: VIDEOS_BY_CAT,
  });

  const { data: categoriesData } = await client.query({
    query: CATEGORIES_QUERY,
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

export default function GalleryPage({
  images,
  category,
  categories,
  categoryTitle,
  videos,
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef();

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleArrowClick = (direction) => {
    if (direction === "prev") {
      setCurrentIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
    } else if (direction === "next") {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
    }
  };

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  if (categoryTitle === "videography") {
    return (
      <Layout categories={categories}>
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
      </Layout>
    );
  } else {
    return (
      <Layout categories={categories}>
        <div>
          <h1 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
            {" "}
            {category.title}{" "}
          </h1>
          <div className="md:columns-2 lg:columns-4 gap-2 my-[2rem] mx-2">
            {images.map((image, index) => (
              <Image
                key={image.id}
                src={image.image.url}
                width={image.image.width}
                height={image.image.height}
                alt="#"
                className="mb-2"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center">
              <div
                className="relative w-[100%] h-[50%] md:w-[100%] md:h-[40%] lg:w-[90%] lg:h-[80%]"
                ref={modalRef}
              >
                <button
                  className="absolute z-10 top-2 right-2 rounded-full px-3 py-1  text-xs md:text-xl uppercase bg-white text-black hover:bg-[#161616] hover:text-white hover:transition-all hover:duration-500"
                  onClick={handleModalClose}
                >
                  X
                </button>
                <div className="absolute inset-0 flex justify-center items-center">
                  <Image
                    src={images[currentIndex].image.url}
                    width={images[currentIndex].image.width}
                    height={images[currentIndex].image.height}
                    alt="#"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="absolute top-1/2 left-0 transform-translate-y-1/2">
                  <button
                    className="bg-white text-black text-xs md:text-base px-4 py-2 rounded-full mr-2 uppercase  hover:bg-[#161616] hover:text-white hover:transition-all hover:duration-500"
                    onClick={() => handleArrowClick("prev")}
                  >
                    Prev
                  </button>
                </div>
                <div className="absolute top-1/2 right-0 transform-translate-y-1/2">
                  <button
                    className="bg-white text-black px-4 py-2 text-xs md:text-base rounded-full uppercase  hover:bg-[#161616] hover:text-white hover:transition-all hover:duration-500"
                    onClick={() => handleArrowClick("next")}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}
