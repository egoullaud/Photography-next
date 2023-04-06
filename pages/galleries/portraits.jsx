import React from "react";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import Image from "next/image";

function portraits({ images }) {
  return (
    <div>
      <h1 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
        portraits gallery
      </h1>
      <div className="md:columns-2 lg:columns-4 gap-2 my-[2rem] mx-2">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.image.url}
            width={image.image.width}
            height={image.image.height}
            alt="#"
            className="mb-2"
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      {
        images(where: { category: { title_contains: "portraits" } }) {
          title
          id
          image {
            url
            height
            width
          }
        }
      }
    `,
  });

  return {
    props: {
      images: data.images,
    },
    revalidate: 86400,
  };
}

export default portraits;
