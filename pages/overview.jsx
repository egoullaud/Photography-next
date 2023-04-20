import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Galleries from "../components/Galleries";
import client from "../apolloClient";
import Layout from "../components/Layout";
import { CATEGORIES_QUERY } from "../services/queries";

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
    query: CATEGORIES_QUERY,
  });
  const categories = categoriesData.categories;

  return {
    props: {
      categories,
    },
    revalidate: 86400,
  };
}
