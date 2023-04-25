import React, { useState, useEffect } from "react";
import Image from "next/image";
import { search, mapImageResources, getFolders } from "../../lib/cloudinary";
import DashboardLayout from "../../components/DashboardLayout";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";

import Masonry from "react-masonry-css";

export default function Admin({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folders,
  totalCount: defaultTotalCount,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);
  const [activeFolder, setActiveFolder] = useState("");
  const [position, updatePosition] = useState(defaultImages);

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
    updatePosition([]);
    setImages([]);
    setTotalCount(0);
  }

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(position);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updatePosition(items);
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
      const {
        resources,
        next_cursor: updatedNextCursor,
        total_count: updatedTotalCount,
      } = results;

      const images = mapImageResources(resources);

      // console.log(images);

      setImages(images);
      updatePosition(images);
      setNextCursor(updatedNextCursor);
      setTotalCount(updatedTotalCount);
    })();
  }, [activeFolder]);
  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    850: 3,
    500: 2,
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center mb-[2rem]">
        {/* cloudinary folders */}

        <ul
          onClick={handleOnFolderClick}
          className="flex justify-center w-[100%] uppercase mt-5"
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <ol
                // className="grid grid-cols-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
                // className="columns-1 md:columns-2 lg:columns-3 gap-2 my-[2rem] mx-2"
              >
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid mt-5 ml-2"
                  columnClassName="my-masonry-grid_column"
                >
                  {position.map((image, index) => {
                    return (
                      <Draggable
                        key={image.id}
                        draggableId={image.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            className="mb-2 mr-2"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div>
                              <img
                                width={image.width}
                                height={image.height}
                                src={image.image}
                                alt=""
                              />
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                </Masonry>
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
        </DragDropContext>
        {totalCount > images.length && (
          <button
            onClick={handleLoadMore}
            className=" font-bold  px-2 border-[#363636] border-[1px] text-xl
           hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500"
          >
            Load More
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  resetServerContext();
  const results = await search({
    expression: `folder=""`,
  });
  // destructure resources
  const {
    resources,
    next_cursor: nextCursor,
    total_count: totalCount,
  } = results;

  const images = mapImageResources(resources);
  const { folders } = await getFolders();
  // console.log("folders", folders);

  // console.log("static Props", results);
  return {
    props: { images, nextCursor: nextCursor || false, folders, totalCount },
  };
}
