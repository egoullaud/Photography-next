import React from "react";
import Image from "next/image";
import profilePic from "../public/profilepic.jpg";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import Layout from "../components/Layout";

function about({ categories }) {
  return (
    <Layout categories={categories}>
      <h1
        className=" font-bold uppercase text-3xl text-center my-[2rem] tracking-wider
                        lg:text-5xl lg:my-[4rem] "
      >
        Meet raine{" "}
      </h1>
      <div className="flex flex-col md:flex-row mb-[1rem]">
        <div
          className="md:w-[50%] xl:w-[40%] flex justify-center items-center
                        "
        >
          <Image
            priority
            className="w-[90%] xl:w-[70%]"
            src={profilePic}
            alt="#"
          />
        </div>
        <div className="md:w-[50%] md:text-left lg:text-2xl lg:w-[60%] mt-[1rem] mx-4 tracking-wider text-center">
          <p>
            I am a current resident of Vancouver. I received a Bachelor of Fine
            Arts from Emily Carr University of Arts and Design. I use
            photography and video to try and create positive changes, in both
            subtle and obvious ways. I feel it is essential to help protect the
            environment around me in any way that I can, whether this is by
            eating local organic foods, or creating a film on why a local wild
            site is worth protecting. Check out my documentary on Vancouver’s
            local food movement, or my feature on the David Suzuki Foundation’s
            YouTube channel. My passion led me to pursue a minor in Social
            Practice and Community Engagement. <br />
            <br />
            Portrait photography has always been what I am the most drawn to.
            They can portray a person’s spirit. Precious moments between family
            members or lovers can be captured to be forever cherished. Portraits
            photography is my way of connecting with people, and telling their
            story to the world. <br />
            <br />
            I love to use techniques such as long exposure, which reveal
            movement of the human body and captures light over time. These
            techniques are my subtle efforts to carry on photography as a
            creative and artistic medium. I believe it is important to push
            photography to the limits and to be experimental; Especially in an
            age where photography is easily accessible.
            <br />
            <br />
          </p>
        </div>
      </div>
    </Layout>
  );
}
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

export default about;
