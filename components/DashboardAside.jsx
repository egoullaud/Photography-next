import React, { useState } from "react";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import {
  BiLogOutCircle,
  BiChevronsRight,
  BiChevronsLeft,
} from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

function DashboardAside() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 bg-[#363636] text-white  ">
      <button onClick={toggleSideBar} className="flex w-[100%]">
        {!isCollapsed ? (
          <h1 className=" flex text-4xl p-4">
            Welcome, Raine{" "}
            <BiChevronsLeft className="text-4xl mt-1 ml-1 hover:rounded-full hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500" />
          </h1>
        ) : (
          <BiChevronsRight className="text-5xl w-full text-center  hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500" />
        )}
      </button>
      {isCollapsed && (
        <ul className="flex flex-col items-center justify-center w-[100%]">
          <Link href="/admin/edit">
            <li className="w-full p-4 text-3xl  hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500">
              {" "}
              <FaRegEdit />
            </li>
          </Link>
          <Link href="/">
            <li className="w-full p-4 text-3xl  hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500">
              {" "}
              <TiArrowBack />
            </li>
          </Link>

          <li className="w-full p-4 text-3xl  hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500">
            {" "}
            <BiLogOutCircle />
          </li>
        </ul>
      )}
      {!isCollapsed && (
        <div>
          <ul className="flex flex-col">
            <Link href="/admin/edit">
              <li className="p-4 flex text-lg border-b-2 border-white  hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500">
                <FaRegEdit className="text-xl mr-2" /> Upload & Edit
              </li>
            </Link>
            <Link href="/">
              <li className="flex p-4 text-lg border-b-2 border-white  hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500">
                <TiArrowBack className="text-2xl mr-1" /> Back to Website
              </li>
            </Link>
            <li className=" flex p-4 text-lg border-b-2 border-white   hover:bg-[#4c4c4c] hover:transition-all hover:duration-500 ease-out duration-500">
              <BiLogOutCircle className="text-2xl mr-1" /> Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DashboardAside;
