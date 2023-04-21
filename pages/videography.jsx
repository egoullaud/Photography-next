import React from "react";
import client from "../apolloClient";
import { VIDEOS_BY_CAT } from "../services/queries";
import Layout from "../components/Layout";

export async function getStaticProps() {
  const { data: videosData } = await client.query({
    query: VIDEOS_BY_CAT,
  });
  const videos = videosData.videos;
  return {
    props: {
      videos,
    },
    revalidate: 86400,
  };
}
function videography({ videos }) {
  return (
    <Layout>
      <div>
        {" "}
        <h1 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
          videography gallery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:m-[2rem] m-4 ">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex flex-col justify-start items-center text-center "
            >
              <iframe
                className=" w-[100%]"
                width="560"
                height="315"
                src={video.embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

              <h1 className="pt-4 mx-4 text-xl uppercase font-semibold tracking-wider">
                {video.title}
              </h1>
              <p
                className="mx-2 lg:mx-8 my-2 tracking-wide"
                dangerouslySetInnerHTML={{ __html: video.description.html }}
              ></p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default videography;
