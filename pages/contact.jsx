import Form from "../components/Form";
import React from "react";
import { GrFacebook, GrInstagram } from "react-icons/gr";
import Link from "next/link";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import Layout from "../components/Layout";

export default function contact({ categories }) {
  return (
    <Layout categories={categories}>
      <h1
        className=" font-bold uppercase text-3xl text-center my-[2rem] tracking-wider 
                        "
      >
        work with me
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl text-center tracking-wider">
          I would love to hear from you! <br /> Fill out the form below to get
          in touch with me.
        </p>
        <Form />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mb-[4rem]">
        <div className="flex flex-col justify-center items-center md:w-[30%]">
          <h2 className=" font-bold uppercase text-2xl text-center my-[2rem] tracking-wider ">
            follow me
          </h2>
          <ul className="flex justify-around items-center w-[50%]">
            <Link
              href="https://www.facebook.com/rainegphotography/"
              target="_blank"
            >
              {" "}
              <li>
                <GrFacebook className="text-3xl" />
              </li>
            </Link>
            <Link
              href="https://www.instagram.com/rainegphotography/?hl=en"
              target="_blank"
            >
              {" "}
              <li>
                <GrInstagram className="text-3xl" />
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center md:w-[30%] ">
          <h2 className=" font-bold uppercase text-2xl text-center my-[2rem] tracking-wider ">
            General enquiries
          </h2>
          <p>raineg@gmail.com</p>
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
