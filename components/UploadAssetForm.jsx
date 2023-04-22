import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

function UploadAssetForm() {
  const [selectedCategory, setSelectedCategory] = useState("home");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  useEffect(() => {
    console.log("category", selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col items-center justify-center my-[5rem]">
      <h1 className=" text-xl md:text-3xl lg:text-4xl tracking-widest mb-[2rem]">
        Upload New Photo
      </h1>
      <form className="flex flex-col" action="">
        <div className="flex">
          <label className="mx-4" htmlFor="category">
            Choose a Gallery
          </label>
          <select name="category" id="category" onChange={handleCategoryChange}>
            <option value="upload_home">Gallery Home Page</option>
            <option value="upload_portraits">Portrait Gallery</option>
            <option value="upload_architecture">Architecture Gallery</option>
            <option value="upload_nature">Nature Gallery</option>
            <option value="upload_light">Light Gallery</option>
            <option value="upload_events">Events Gallery</option>
          </select>
        </div>

        <CldUploadWidget uploadPreset={`${selectedCategory}`}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button
                className="mt-4 uppercase w-[60%] mx-auto hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 p-2 px-4"
                onClick={handleOnClick}
              >
                Upload Image
              </button>
            );
          }}
        </CldUploadWidget>
      </form>
    </div>
  );
}

export default UploadAssetForm;
