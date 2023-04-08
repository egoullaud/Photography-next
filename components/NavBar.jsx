import React, { useState } from "react";
import Link from "next/link";

function NavBar({ categories }) {
  console.log(categories);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="mx-2 text-[#363636] mb-[1rem] border-b-2 border-[#363636]">
      <nav>
        <div
          className="text-center my-[2rem] uppercase
                      md:my-[3rem]
                        lg:my-[4rem]"
        >
          <h1 className="text-center text-3xl md:text-5xl lg:text-7xl leading-none tracking-widest">
            Raine Gauthier
          </h1>
          <h2 className=" text-xl md:text-3xl lg:text-4xl tracking-widest">
            Photography
          </h2>
        </div>
        <div className=" hidden lg:flex justify-center lg:text-xl">
          <ul className=" hidden lg:flex justify-center lg:text-xl">
            {categories &&
              categories?.map((category) => (
                <li
                  className="hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 p-2 px-4 uppercase"
                  key={category.id}
                >
                  <Link href={`/${category.slug}`}>{category.title}</Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Mobile navigation */}
        <button
          className="block lg:hidden w-[12rem] text-center hover:bg-[#363636] text-xl tracking-wide hover:text-white hover:transition-all hover:duration-1000 p-2 px-4 uppercase mx-auto z-10"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          Menu
        </button>
        {showMenu && (
          <div className=" lg:hidden flex flex-col justify-center items-center w-[100%] lg:text-xl">
            <ul>
              {categories?.map((category) => (
                <li
                  className="w-[12rem] text-center hover:bg-[#363636] text-xl tracking-wide hover:text-white hover:transition-all hover:duration-1000 p-2 px-4 uppercase"
                  key={category.id}
                >
                  <Link href={`/${category.slug}`}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
