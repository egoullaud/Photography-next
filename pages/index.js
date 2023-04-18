import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import photography from "../public/photography.jpg";
import videographyServices from "../public/videography6.jpg";
import arch from "../public/travel-hero.jpg";
import events from "../public/events-hero.jpg";
import light from "../public/light-hero.jpg";
import nature from "../public/nature-hero.jpg";
import portraits from "../public/portrait-hero.jpg";
import videography from "../public/music-video.jpg";
import heroImg from "../public/hero-img.jpg";
import Layout from "../components/Layout";
import client from "../apolloClient";
import { gql } from "@apollo/client";

function home({ categories }) {
  return (
    <Layout categories={categories}>
      <div>
        <Head>
          <title>Raine Gauthier Photography</title>
          <meta
            name="description"
            content="Raine Gauthier Photography Website"
          />
        </Head>

        <main>
          <div className="flex flex-col items-center justify-center  lg:mt-[5rem]">
            {/* Hero area */}
            <div
              className="flex justify-center items-center text-center m-4
                        md:text-xl md:mx-[2rem]
                        lg:text-3xl lg:mb-[5rem]"
            >
              <p className="italic tracking-wider">
                “When words become unclear, I shall focus with photographs. When
                images become inadequate, I shall be content with silence.”
                <br />
                <span className="not-italic">— Ansel Adams</span>
              </p>
            </div>
            <Image priority src={heroImg} className="" alt="/" />
          </div>
          <div className="flex flex-col ">
            <h1
              className="uppercase text-3xl text-center pt-[2rem] border-t-2 border-[#363636] tracking-wider
                    lg:text-5xl"
            >
              services
            </h1>

            <div className="flex flex-col md:flex-row justify-around items-start xl:justify-center mt-[2rem] lg:mt-[5rem]">
              <div
                className="flex flex-col justify-center items-center ml-4
          md:w-[45%] 
          lg:w-[50%]
          xl:w-[35%] "
              >
                <Image
                  src={photography}
                  className=" object-cover h-52 w-64 "
                  alt="#"
                />
                <h3 className="pt-2 text-2xl font-bold pb-2  uppercase tracking-widest">
                  Photography
                </h3>
                <p className="w-[90%] text-center tracking-widest mt-4 mb-4">
                  I offer a wide range of services, including events, shows,
                  festivals, headshots, couple and family portraits. <br />
                </p>
                <Link href="/about">
                  <button
                    className=" font-bold  px-2 border-[#363636] border-[1px] text-xl
              hover:bg-[#363636] hover:text-white hover:transition-all hover:durations-1000"
                  >
                    About Me
                  </button>
                </Link>
              </div>

              <div
                className="flex flex-col justify-center items-center pb-2
          md:w-[60%]
          lg:w-[50%]
          xl:w-[40%]"
              >
                <Image
                  src={videographyServices}
                  className=" object-cover h-52 w-64"
                  alt="#"
                />
                <h3 className="pt-2 text-2xl font-bold pb-2  uppercase tracking-widest">
                  Videography
                </h3>
                <p className="w-[90%] text-center tracking-widest">
                  I offer production and post-production services. Looking for
                  someone to create your next video for social media? Have an
                  idea for a documentary that you would love to see come to
                  life?
                  <br />
                </p>
                <Link href="/contact">
                  <button
                    className="font-bold px-2 mt-4 border-[#363636] border-[1px] text-xl
              hover:bg-[#363636] hover:text-white hover:transition-all hover:durations-1000"
                  >
                    Let’s chat!
                  </button>
                </Link>
              </div>
            </div>
            {/* <Cta /> */}
          </div>
          <div className="px-2 lg:mt-[5rem] ">
            <h3 className="uppercase text-3xl text-center pt-[2rem] tracking-wider border-t-2 border-[#363636] lg:text-5xl">
              Galleries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 px-2 py-4 pb-[5rem]">
              <Link href="/architecture">
                <div className="shadow-2xl ">
                  <h4 className="uppercase text-xl text-center">
                    Architecture
                  </h4>
                  <Image
                    src={arch}
                    alt="#"
                    className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
                  />
                </div>
              </Link>
              <Link href="/events">
                <div className="shadow-2xl">
                  <h4 className="uppercase text-xl text-center">events</h4>
                  <Image
                    src={events}
                    alt="#"
                    className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
                  />
                </div>
              </Link>
              <Link href="/nature">
                <div className="shadow-2xl">
                  <h4 className="uppercase text-xl text-center">nature</h4>
                  <Image
                    src={nature}
                    alt="#"
                    className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
                  />
                </div>
              </Link>
              <Link href="/light">
                <div className="shadow-2xl">
                  <h4 className="uppercase text-xl text-center">light</h4>
                  <Image
                    src={light}
                    alt="#"
                    className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
                  />
                </div>
              </Link>
              <Link href="/portraits">
                <div className="shadow-2xl">
                  <h4 className="uppercase text-xl text-center hover:scale-105 hover:transition-all hover:duration-1000">
                    portraits
                  </h4>
                  <Image
                    src={portraits}
                    alt="#"
                    className="h-52 object-top object-cover hover:scale-105 hover:transition-all hover:duration-1000"
                  />
                </div>
              </Link>
              <Link href="/videography">
                <div className="shadow-2xl">
                  <h4 className="uppercase text-xl text-center">videography</h4>
                  <Image
                    src={videography}
                    alt="#"
                    className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
                  />
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
export default home;

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
