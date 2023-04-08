import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Galleries from "../components/Galleries";
import client from "../apolloClient";

import { gql } from "@apollo/client";

export default function Overview({ videos }) {
  return (
    <div>
      <Hero />
      <Services />
      <Galleries />
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      {
        videos(where: { category: { title_contains: "videography" } }) {
          title
          id
          description {
            html
          }
          embedUrl
        }
      }
    `,
  });

  return {
    props: {
      videos: data.videos,
    },
    revalidate: 86400,
  };
}
