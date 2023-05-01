import React from "react";
import Image from "next/image";
import photography from "../public/photography.jpg";
import videography from "../public/videography6.jpg";
import Cta from "./Cta";
import Link from "next/link";

function Services({ services }) {
  return (
    <div className="flex flex-col mb-5 ">
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
              className=" object-cover h-64 w-80"
              alt="#"
            />
            <h3 className="pt-2 text-2xl font-bold pb-2  uppercase tracking-widest">
              {service.title}
            </h3>
            <p
              dangerouslySetInnerHTML={{ __html: service.content.html }}
              className="w-[90%] text-center tracking-widest mt-4 mb-4"
            ></p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-5">
        <Link href="/galleries">
          <button className="p-2 px-4 w-[12rem] lg:text-xl uppercase shadow-md bg-[#363636] hover:bg-[#4c4c4c] text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 tracking-wide">
            See my work{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Services;
