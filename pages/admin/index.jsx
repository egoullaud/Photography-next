import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import client from "../../apolloClient";
import { gql } from "@apollo/client";

function Upload({ categories }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(file);
    setFile(file);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Category:", category);
    console.log("File:", file);

    // You can add your mutation here to create the image
  };

  return (
    <DashboardLayout categories={categories}>
      <div className="flex flex-col w-[100%] items-center justify-end">
        <h2 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
          Add New Photo
        </h2>
        <p className="mb-[2rem]">Maximum size: 100mb</p>
        <form
          method="post"
          onSubmit={handleOnSubmit}
          encType="multipart/form-data"
          className="flex flex-col justify-around items-center mb-[4rem] lg:w-[90%]"
        >
          <div className="flex justify-around items-center mb-[4rem] lg:w-[90%]">
            <div className="w-[30%] mx-2">
              <input
                required
                type="text"
                placeholder="Title"
                className="border-2 border-[#363636] p-2 shadow-lg mb-2 w-[100%] tracking-wide"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="w-[30%]">
              <select
                required
                id="category"
                name="category"
                className="border-2 border-[#363636] p-2 shadow-lg mb-2 w-[100%] tracking-wide"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="">Select Category</option>
                <option value="architecture">Architecture</option>
                <option value="Events">Events</option>
                <option value="Portraits">Portraits</option>
                <option value="Nature">Nature</option>
                <option value="Light">Light</option>
                <option value="Videography">Videography</option>
              </select>
            </div>
            <div className="w-[30%]">
              <input
                required
                type="file"
                name="file"
                className="p-3 mb-2 w-[100%] tracking-wide"
                onChange={handleOnChange}
              />
            </div>

            <div className="w-[30%]">
              {imageSrc && (
                <button
                  className="border-2 border-[#363636] p-2 shadow-lg my-2 w-[60%] lg:w-[45%] hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 tracking-wide"
                  type="submit"
                >
                  Upload Photo
                </button>
              )}
            </div>
          </div>
          {imageSrc && <img src={imageSrc} />}
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Upload;

export async function getStaticProps() {
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

  return {
    props: {
      categories,
    },
    revalidate: 86400,
  };
}
