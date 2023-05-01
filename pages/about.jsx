import React from "react";
import Image from "next/image";
import profilePic from "../public/profilepic.jpg";
import Layout from "../components/Layout";
import { ABOUT_PAGE_QUERY } from "../services/queries";
import client from "../apolloClient";

function about({ about }) {
  return (
    <Layout>
      {about.map((about) => (
        <div className="about">
          <h1
            className=" font-bold uppercase text-3xl text-center my-[2rem] tracking-wider
                        lg:text-5xl lg:my-[4rem] "
          >
            {about.title}
          </h1>
          <div className="flex flex-col md:flex-row mb-[1rem]">
            <div
              className="md:w-[50%] xl:w-[40%] flex justify-center items-center
                        "
            >
              <Image
                priority
                className="w-[90%] xl:w-[70%]"
                height={about.aboutPic.height}
                width={about.aboutPic.width}
                src={about.aboutPic.url}
                alt="#"
              />
            </div>

            <div className="md:w-[50%] md:text-left lg:text-2xl lg:w-[60%] mt-[1rem] mx-4 tracking-wider text-center">
              <p dangerouslySetInnerHTML={{ __html: about.content.html }}></p>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
}
export async function getStaticProps() {
  const { data: aboutData } = await client.query({
    query: ABOUT_PAGE_QUERY,
  });
  const about = aboutData.abouts;

  return {
    props: {
      about,
    },
    revalidate: 86400,
  };
}

export default about;
