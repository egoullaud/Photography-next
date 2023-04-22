import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { search, mapImageResources, getFolders } from "../lib/cloudinary";
import Layout from "../components/Layout";

export default function Galleries({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folders,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef();
  console.log(activeFolder);

  async function handleLoadMore(e) {
    e.preventDefault();
    const results = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
        expression: `folder="${activeFolder}"`,
      }),
    }).then((r) => r.json());
    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages((prev) => {
      return [...prev, ...images];
    });

    setNextCursor(updatedNextCursor);
  }

  function handleOnFolderClick(e) {
    const folderPath = e.target.dataset.folderPath;
    setActiveFolder(folderPath);
    setNextCursor(undefined);
    setImages([]);
  }

  useEffect(() => {
    (async function run() {
      const results = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          nextCursor,
          expression: `folder="${activeFolder}"`,
          // sort_by: "public_id=asc",
        }),
      }).then((r) => r.json());
      const { resources, next_cursor: updatedNextCursor } = results;

      const images = mapImageResources(resources);
      console.log(images);
      setImages(images);

      setNextCursor(updatedNextCursor);
    })();
  }, [activeFolder]);

  // modal functions

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
    <Layout>
      <div className="flex flex-col items-center justify-center mb-[2rem]">
        {/* NavBar */}
        {/* cloudinary folders */}
        <ul
          onClick={handleOnFolderClick}
          className="flex justify-center w-[100%] uppercase"
        >
          {folders
            .sort((a, b) => b.name.localeCompare(a.name))
            .map((folder) => (
              <li
                className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 p-2 px-4"
                key={folder.path}
              >
                <button data-folder-path={folder.path} className="uppercase">
                  {folder.name}
                </button>
              </li>
            ))}
        </ul>
        {/* display galleries */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-2 my-[2rem] mx-2">
          {images.map((image, index) => {
            return (
              <div key={image.id}>
                <Image
                  className="mb-2"
                  width={image.width}
                  height={image.height}
                  src={image.image}
                  alt=""
                  onClick={() => handleImageClick(index)}
                />
              </div>
            );
          })}
        </div>
        {activeFolder && (
          <button
            onClick={handleLoadMore}
            className="uppercase hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 p-2 px-4"
          >
            Load More
          </button>
        )}
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
                  src={images[currentIndex].image}
                  width={images[currentIndex].width}
                  height={images[currentIndex].height}
                  alt=""
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

export async function getStaticProps() {
  const results = await search({
    expression: `folder=""`,
  });
  // destructure resources
  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);
  const { folders } = await getFolders();
  // console.log("folders", folders);

  // console.log("static Props", results);
  return {
    props: { images, nextCursor: nextCursor || false, folders },
  };
}
