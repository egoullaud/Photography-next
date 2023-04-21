import React, { useState, useEffect } from "react";
import Image from "next/image";
import { search, mapImageResources, getFolders } from "../../lib/cloudinary";

export default function admin({
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
    <div className="flex flex-col items-center justify-center">
      {/* NavBar */}
      <div
        className="text-center my-[2rem] uppercase
                      md:my-[3rem]
                        lg:my-[4rem]"
      >
        <h1 className="text-center text-3xl md:text-5xl lg:text-7xl leading-none tracking-widest">
          Raine Gauthier
        </h1>
        <h2 className=" text-xl md:text-3xl lg:text-4xl tracking-widest">
          Photography
        </h2>
      </div>
      <ul className="flex justify-around w-[100%] uppercase border-b-[1px] border-[#363636]">
        <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500 p-2 px-4">
          <button className="uppercase">overview</button>
        </li>
        <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500 p-2 px-4">
          <button className="uppercase">About</button>
        </li>
        {/* cloudinary folders */}
        <ul
          onClick={handleOnFolderClick}
          className="flex justify-around w-[100%] uppercase"
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

        <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500 p-2 px-4">
          <button className="uppercase">contact</button>
        </li>
      </ul>

      {/* display galleries */}
      {activeFolder &&
        (<div className="grid grid-cols-4 gap-2 my-[2rem] mx-2">
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
        </div>)(
          <button
            onClick={handleLoadMore}
            className=" font-bold  px-2 border-[#363636] border-[1px] text-xl
           hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500"
          >
            Load More
          </button>
        )}
    </div>
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
