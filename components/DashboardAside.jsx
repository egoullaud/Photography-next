import React from "react";

function DashboardAside() {
  return (
    <div className="fixed top-0 bottom-0 left-0 bg-[#363636] text-white w-[20%] ">
      <div className="py-4">
        <h1 className="text-4xl p-2">Welcome, Raine</h1>
      </div>
      <ul className="flex flex-col">
        <li className="p-4 pl-2 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Upload Photos
        </li>
        <li className="p-4 pl-2 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Edit Galleries{" "}
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Architecture
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Events
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Portraits
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Nature
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Light
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Videography
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Back to Website
        </li>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Log Out
        </li>
      </ul>
    </div>
  );
}

export default DashboardAside;
