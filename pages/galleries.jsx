import React, { useState, useEffect } from "react";
import Image from "next/image";
import { search, mapImageResources, getFolders } from "../lib/cloudinary";
import Layout from "../components/Layout";

export default function galleries({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folders,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState("");
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

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {/* NavBar */}
        {/* cloudinary folders */}
        <ul
          onClick={handleOnFolderClick}
          className="flex justify-center w-[100%] uppercase"
        >
          {folders.map((folder) => (
            <li
              className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500 p-2 px-4"
              key={folder.path}
            >
              <button data-folder-path={folder.path} className="uppercase">
                {folder.name}
              </button>
            </li>
          ))}
        </ul>
        {/* display galleries */}
        <div className="grid grid-cols-4 gap-2 my-[2rem] mx-2">
          {images.map((image) => {
            return (
              <div key={image.id}>
                <Image
                  className="mb-2"
                  width={image.width}
                  height={image.height}
                  src={image.image}
                  alt=""
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={handleLoadMore}
          className=" font-bold  px-2 border-[#363636] border-[1px] text-xl
             hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500"
        >
          Load More
        </button>
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
