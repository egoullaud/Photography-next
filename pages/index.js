import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import photography from "../public/photography.jpg";
import videographyServices from "../public/videography6.jpg";
import heroImg from "../public/hero-img.jpg";
import Layout from "../components/Layout";
import { SERVICES_PAGE_GUERY } from "../services/queries";
import client from "../apolloClient";

function home({ services }) {
  return (
    <Layout>
      <div>
        <Head>
          <title>Raine Gauthier Photography</title>
          <meta
            name="description"
            content="Raine Gauthier Photography Website"
          />
        </Head>

        <main>
          {/* hero area */}
          <div className="flex flex-col items-center justify-center  lg:mt-[5rem]">
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

          {/* services area */}

          <div className="flex flex-col ">
            <h1
              className="uppercase text-3xl text-center pt-[2rem] border-t-2 border-[#363636] tracking-wider
                    lg:text-5xl"
            >
              services
            </h1>

            <div className="flex flex-col md:flex-row justify-around items-start xl:justify-center mt-[2rem] lg:mt-[5rem]">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col justify-center items-center ml-4
          md:w-[45%] 
          lg:w-[50%]
          xl:w-[35%] "
                >
                  <Image
                    src={service.image.url}
                    height={service.image.height}
                    width={service.image.width}
                    className=" object-cover h-52 w-64 "
                    alt="#"
                  />
                  <h3 className="pt-2 text-2xl font-bold pb-2  uppercase tracking-widest">
                    {service.title}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={service.content.html}
                    className="w-[90%] text-center tracking-widest mt-4 mb-4"
                  ></p>
                  <Link href="/about">
                    <button
                      className=" font-bold  px-2 border-[#363636] border-[1px] text-xl
              hover:bg-[#363636] hover:text-white hover:transition-all hover:durations-1000"
                    >
                      About Me
                    </button>
                  </Link>
                </div>
              ))}

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
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: SERVICES_PAGE_GUERY,
  });
  const services = data.services;

  return {
    props: {
      services,
    },
    revalidate: 86400,
  };
}
export default home;
