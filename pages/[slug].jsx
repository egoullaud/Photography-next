import { useEffect, useRef, useState } from "react";
import React from "react";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";

export default function GalleryPage({ images, category }) {
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
  return (
    <div>
      <h1 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
        {category.title}
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
  );
}

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

export async function getServerSideProps(context) {
  const { slug } = context.query;

  if (slug === "about") {
    return {
      redirect: {
        destination: "/about",
        permanent: true,
      },
    };
  }

  if (slug === "contact") {
    return {
      redirect: {
        destination: "/contact",
        permanent: true,
      },
    };
  }

  if (slug === "overview") {
    return {
      redirect: {
        destination: "/overview",
        permanent: true,
      },
    };
  }

  // If the slug does not match any of the above, return the content as usual
  const { data } = await client.query({
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

  return {
    props: {
      images: data.images,
      category: data.images[0].category,
    },
  };
}

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const { data } = await client.query({
//     query: gql`
//       query ImagesBySlug($slug: String!) {
//         images(where: { category: { slug: $slug } }) {
//           title
//           id
//           image {
//             url
//             height
//             width
//           }
//           category {
//             title
//             id
//           }
//         }
//       }
//     `,
//     variables: { slug },
//   });

//   return {
//     props: {
//       images: data.images,
//       category: data.images[0].category,
//     },
//     revalidate: 86400,
//   };
// }
