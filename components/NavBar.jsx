import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="mx-2 text-[#363636] mb-[1rem]">
      <nav className="uppercase flex flex-col justify-center items-center border-b-2 border-[#1f1f1f] ">
        <div
          className="text-center my-[2rem]
                      md:my-[3rem]
                        lg:my-[4rem]"
        >
          <Link href="/">
            <h1 className="text-center text-3xl md:text-5xl lg:text-7xl leading-none tracking-widest">
              Raine Gauthier
            </h1>
            <h2 className=" text-xl md:text-3xl lg:text-4xl tracking-widest">
              Photography
            </h2>
          </Link>
        </div>

        <ul className=" hidden lg:flex justify-center w-[100%] lg:text-xl">
          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/">overview</Link>
          </li>
          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/about">about</Link>
          </li>
          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/galleries/portraits">portraits</Link>
          </li>

          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/galleries/events">events</Link>
          </li>
          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/galleries/nature">nature</Link>
          </li>
          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/galleries/architecture">architecture</Link>
          </li>
          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/galleries/light">light</Link>
          </li>

          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/galleries/videography">videography</Link>
          </li>
          <li className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4">
            <Link href="/contact">contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
