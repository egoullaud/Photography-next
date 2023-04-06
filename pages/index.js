import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apolloClient";
import { GrHeroku } from "react-icons/gr";
import Galleries from "@/components/Galleries";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home({ categories }) {
  console.log(categories);
  return (
    <div>
      <Head>
        <title>Raine Gauthier Photography</title>
        <meta name="description" content="Raine Gauthier Photography Website" />
      </Head>

      <main>
        <Hero />
        <Services />
        <Galleries categories={categories} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Categories {
        categories {
          title
          slug
          id
        }
      }
    `,
  });

  return {
    props: {
      categories: data.categories,
    },
  };
}
