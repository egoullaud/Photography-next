import React from "react";
import Image from "next/image";
import photography from "../../public/services/photography.jpg";

import Cta from "../Cta";

function Services() {
  return (
    <div className="flex flex-col mx-2">
      <h1 className="uppercase text-3xl text-center mt-[2rem] border-b-2 border-[#363636] tracking-wider">
        services
      </h1>

      <div className="flex flex-col md:flex-row justify-around items-start xl:justify-center mt-[2rem]">
        <div
          className="flex flex-col justify-center items-center ml-4
          md:w-[45%] 
          lg:w-[50%]
          xl:w-[35%] "
        >
          <h3 className=" text-2xl font-bold pb-2  uppercase tracking-widest">
            Photography
          </h3>
          <p className="w-[90%] text-center tracking-widest mt-4 mb-4">
            I offer a wide range of services, including events, shows,
            festivals, headshots, couple and family portraits.
          </p>
          {/* <Image src={photography} className=" w-[100%] object-cover" /> */}
        </div>

        <div
          className="flex flex-col justify-center items-center pb-2
          md:w-[60%]
          lg:w-[50%]
          xl:w-[40%]"
        >
          <h3 className=" text-2xl font-bold pb-2  uppercase tracking-widest">
            Videography
          </h3>
          <p className="w-[90%] text-center tracking-widest">
            I offer production and post-production services. Looking for someone
            to create your next video for social media? Have an idea for a
            documentary that you would love to see come to life? Let’s chat!
          </p>
        </div>
      </div>
      {/* <Cta /> */}
    </div>
  );
}

export default Services;
