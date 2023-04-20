import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import client from "../../apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";

function Upload({ categories }) {
  return (
    <DashboardLayout categories={categories}>
      <div className="flex flex-col justify-center items-end">
        <div className="w-[100%]">
          <div className="flex flex-col items-center">
            <h2 className="uppercase text-3xl text-center mt-[4rem] mb-[2rem] tracking-wider">
              Add Photo on Hygraph
            </h2>

            <Link href="https://hygraph.com/" target="_blank">
              <button className="mb-[2rem] text-lg p-3 border-[1px] border-[#363636] hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-500 ease-out duration-500 ">
                Go to Hygraph
              </button>
            </Link>
          </div>

          <div className="flex justify-around items-center  ">
            <ol className="list-decimal">
              {" "}
              <span className="text-xl">Add a Photo</span>
              <li>Log in to Hygraph</li>
              <li>Click "Content" on left-hand side</li>
              <li>Click "Add Entry" on top right</li>
              <li>
                Click add Image, and select from your desktop (Max size 100mb)
              </li>
              <li>Add title of photo</li>
              <li>
                Add category: Click on "Add existing category" and select
                category
              </li>
            </ol>
            <ol className="list-decimal">
              <span className="text-xl">Add a Video</span>
              <li>Select "Video" from content list </li>
              <li>Click "Add Entry" on top right</li>
              <li>Click add Video and click the "Upload" button</li>
              <li>Copy/paste the Youtube URL to upload the video.</li>
              <li>Add in the description and title</li>
              <li>
                Add to Videography: select "add existing category" and select
                videography
              </li>
            </ol>
          </div>
        </div>
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
