import Image from "next/image";
import React from "react";
Image;
import Link from "next/link";
function About({ about }) {
  return (
    <>
      {about.map((about) => (
        <div key={about.id} className="about pb-[5rem]">
          <h1
            className="uppercase text-3xl text-center pt-[2rem] border-t-2 border-[#363636] tracking-wider
         lg:text-5xl lg:py-[3rem] py-5 "
          >
            {about.title}
          </h1>
          <div className="flex flex-col md:flex-row mb-[1rem]">
            <div
              className="md:w-[50%] xl:w-[40%] flex justify-center items-center pb-5
                        "
            >
              <Image
                priority
                className="w-[90%] xl:w-[70%]"
                height={about.aboutPic.height}
                width={about.aboutPic.width}
                src={about.aboutPic.url}
                alt="#"
              />
            </div>

            <div className="md:w-[50%] md:text-left lg:text-2xl lg:w-[60%] mt-[1rem] mx-4 tracking-wider text-center">
              <p dangerouslySetInnerHTML={{ __html: about.content.html }}></p>
            </div>
          </div>
          <div className="flex justify-center items-center my-5">
            <Link href="/contact">
              <button className="p-2 px-4 w-[12rem] lg:text-xl uppercase shadow-md bg-[#363636] hover:bg-[#4c4c4c] text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 tracking-wide">
                Work with Me
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default About;
