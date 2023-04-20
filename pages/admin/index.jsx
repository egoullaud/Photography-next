import React, { useState, useEffect } from "react";
import Image from "next/image";
import { search, mapImageResources } from "../../lib/cloudinary";

export default function admin({
  images: defaultImages,
  nextCursor: defaultNextCursor,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  console.log("images", images);
  console.log("nextCursor", nextCursor);

  // useEffect(() => {
  //   (async function run() {
  //     const results = await fetch("/api/search", {
  //       method: "POST",
  //       body: JSON.stringify({
  //       }),
  //     }).then((r) => r.json());

  //     console.log("results", results);
  //   })();
  // }, []);

  async function handleLoadMore(e) {
    e.preventDefault();
    const results = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
      }),
    }).then((r) => r.json());
    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages((prev) => {
      return [...prev, ...images];
    });

    setNextCursor(updatedNextCursor);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="md:columns-2 lg:columns-4 gap-2 my-[2rem] mx-2">
        {images.map((image) => {
          return (
            <div key={image.id}>
              <Image
                priority
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
  );
}

export async function getStaticProps() {
  const results = await search();
  // destructure resources
  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  // console.log("static Props", results);
  return {
    props: { images, nextCursor },
  };
}
