import Link from "next/link";
import React from "react";

function Cta() {
  return (
    <div className="flex justify-center items-center mb-5">
      <div className="flex flex-row justify-between mt-5 items-center text-xl lg:text-2xl md:w-[45%]">
        <Link href="/about">
          <button className=" py-2 px-3 uppercase shadow-md bg-[#363636] hover:bg-[#4c4c4c] text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 tracking-wide">
            Meet Me
          </button>
        </Link>
        <Link href="/contact">
          <button className="py-2 px-3 uppercase shadow-md bg-[#363636] hover:bg-[#4c4c4c] text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 tracking-wide">
            Work with Me
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cta;
