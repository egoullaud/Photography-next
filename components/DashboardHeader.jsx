import React from "react";

function DashboardHeader() {
  return (
    <div className="flex justify-between  bg-[#363636] text-white font-bold">
      <div>
        <h1 className="text-2xl p-2">Raine Gauthier Photography</h1>
        <h2 className="text-xl px-2 pb-1">Dashboard</h2>
      </div>
      <div>
        <ul className="flex mx-2 ">
          <li className="p-2 m-2 hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
            Back to Website
          </li>
          <li className="p-2 m-2 hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardHeader;
