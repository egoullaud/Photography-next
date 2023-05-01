import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { search, mapImageResources, getFolders } from "../lib/cloudinary";
import Layout from "../components/Layout";
import Masonry from "react-masonry-css";

export default function Galleries({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folders,
  totalCount: defaultTotalCount,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState("portraits");
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);
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
    const {
      resources,
      next_cursor: updatedNextCursor,
      total_count: updatedTotalCount,
    } = results;

    const images = mapImageResources(resources);

    setImages((prev) => {
      return [...prev, ...images];
    });

    setNextCursor(updatedNextCursor);
    setTotalCount(updatedTotalCount);
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
          expression: `folder="${activeFolder}"`,
          // sort_by: "public_id=asc",
        }),
      }).then((r) => r.json());
      const {
        resources,
        next_cursor: updatedNextCursor,
        total_count: updatedTotalCount,
      } = results;

      const images = mapImageResources(resources);

      setImages(images);
      setNextCursor(updatedNextCursor);
      setTotalCount(updatedTotalCount);
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
  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    850: 3,
    500: 2,
  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mb-[2rem]">
        {/* NavBar */}
        {/* cloudinary folders */}
        <ul
          onClick={handleOnFolderClick}
          className="flex flex-wrap justify-center w-[100%] uppercase"
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
        <ol>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid mt-5 ml-2"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image, index) => {
              return (
                <li key={image.id} className="mb-2 mr-2">
                  <Image
                    width={image.width}
                    height={image.height}
                    src={image.image}
                    alt=""
                    onClick={() => handleImageClick(index)}
                  />
                </li>
              );
            })}
          </Masonry>
        </ol>

        {totalCount > images.length && (
          <button
            onClick={handleLoadMore}
            className=" font-bold  px-2 border-[#363636] border-[1px] text-xl
           hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500"
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
  const {
    resources,
    next_cursor: nextCursor,
    total_count: totalCount,
  } = results;

  const images = resources.map((resource) => {
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    };
  });

  const { folders } = await getFolders();
  // console.log("folders", folders);

  // console.log("static Props", results);
  return {
    props: {
      images: images || null,
      nextCursor: nextCursor || false,
      folders,
      totalCount,
    },
  };
}
