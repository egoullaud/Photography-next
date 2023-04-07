import React from "react";
import { gql } from "@apollo/client";
import client from "../../apolloClient";

function videography({ videos }) {
  return (
    <div>
      {" "}
      <h1 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
        videography gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-[2rem] ">
        {videos.map((video) => (
          <div className="flex flex-col justify-start items-center text-center">
            <iframe
              width="560"
              height="315"
              src={video.embedUrl}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>

            <h1 className="pt-4 mx-4 text-xl uppercase font-semibold tracking-wider">
              {video.title}
            </h1>
            <p
              className="mx-8 my-2 tracking-wide"
              dangerouslySetInnerHTML={{ __html: video.description.html }}
            ></p>
          </div>
        ))}
      </div>
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
export default videography;
