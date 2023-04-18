import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Galleries from "../components/Galleries";
import client from "../apolloClient";

import { gql } from "@apollo/client";
import Layout from "../components/Layout";

export default function Overview({ categories }) {
  return (
    <Layout categories={categories}>
      <Hero />
      <Services />
      <Galleries />
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
