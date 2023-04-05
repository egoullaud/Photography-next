import Head from "next/head";
import Image from "next/image";

import { gql } from "@apollo/client";
import client from "../apolloClient";

export default function Home({ categories }) {
  return (
    <div>
      <Head>
        <title>Raine Gauthier Photography</title>
        <meta name="description" content="Raine Gauthier Photography Website" />
      </Head>

      <main>
        <div c>
          {categories.map((category) => (
            <div key={category.id}>
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
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
