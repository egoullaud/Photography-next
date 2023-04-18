import React from "react";
import Link from "next/link";

function DashboardAside({ categories }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 bg-[#363636] text-white w-[20%] ">
      <div className="py-4">
        <h1 className="text-4xl p-2">Welcome, Raine</h1>
      </div>
      <ul className="flex flex-col">
        <Link href="/admin/">
          {" "}
          <li className="p-4 pl-2 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
            Upload Photos
          </li>
        </Link>
        <li className="p-4 pl-2 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Edit Galleries{" "}
        </li>
        {categories &&
          categories?.map((category) => (
            <Link key={category.id} href={`/admin/edit/${category.slug}`}>
              {" "}
              <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
                {category.title}
              </li>
            </Link>
          ))}

        <Link href="/">
          {" "}
          <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
            Back to Website
          </li>
        </Link>
        <li className="p-4 pl-10 text-lg border-b-2 border-white  hover:bg-white hover:text-[#363636] hover:transition-all hover:duration-500 ease-out duration-500">
          Log Out
        </li>
      </ul>
    </div>
  );
}

export default DashboardAside;
