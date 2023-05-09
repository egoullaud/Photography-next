import Form from "../components/Form";
import React from "react";
import { GrFacebook, GrInstagram } from "react-icons/gr";
import Link from "next/link";

import Layout from "../components/Layout";

function formSubmit() {
  return (
    <Layout>
      <h1
        className=" font-bold uppercase text-3xl text-center my-[2rem] tracking-wider 
                      "
      >
        work with me
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl text-center tracking-wider">
          I would love to hear from you! <br /> Fill out the form below to get
          in touch with me.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mb-[4rem]">
        <div className="flex flex-col justify-center items-center md:w-[30%]">
          <h2 className=" font-bold uppercase text-2xl text-center my-[2rem] tracking-wider ">
            follow me
          </h2>
          <ul className="flex justify-around items-center w-[50%]">
            <Link
              href="https://www.facebook.com/rainegphotography/"
              target="_blank"
            >
              {" "}
              <li>
                <GrFacebook className="text-3xl hover:scale-110 hover:shadow-lg hover:transition-all hover:duration-500 ease-out duration-500" />
              </li>
            </Link>
            <Link
              href="https://www.instagram.com/rainegphotography/?hl=en"
              target="_blank"
            >
              {" "}
              <li>
                <GrInstagram className="text-3xl hover:scale-110 hover:shadow-lg hover:transition-all hover:duration-500 ease-out duration-500" />
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center md:w-[30%] ">
          <h2 className=" font-bold uppercase text-2xl text-center my-[2rem] tracking-wider ">
            General enquiries
          </h2>
          <p>raineg@gmail.com</p>
        </div>
      </div>
    </Layout>
  );
}

export default formSubmit;
