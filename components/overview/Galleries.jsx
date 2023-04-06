import React from "react";
import Image from "next/image";
import Link from "next/link";
import arch from "../../public/gallery/travel-hero.jpg";
import events from "../../public/gallery/events-hero.JPG";
import light from "../../public/gallery/light-hero.jpg";
import nature from "../../public/gallery/nature-hero.JPG";
import portraits from "../../public/gallery/portrait-hero.JPG";
import videography from "../../public/gallery/music-video.jpg";

function Galleries() {
  return (
    <div className="px-2 lg:mt-[5rem] ">
      <h3 className="uppercase text-3xl text-center pt-[2rem] tracking-wider border-t-2 border-[#363636] lg:text-5xl">
        Galleries
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 px-2 py-4 pb-[5rem]">
        <Link href="/galleries/architecture">
          <div className="shadow-2xl ">
            <h4 className="uppercase text-xl text-center">Architecture</h4>
            <Image
              src={arch}
              alt="#"
              className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
            />
          </div>
        </Link>
        <Link href="/galleries/events">
          <div className="shadow-2xl">
            <h4 className="uppercase text-xl text-center">events</h4>
            <Image
              src={events}
              alt="#"
              className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
            />
          </div>
        </Link>
        <Link href="/galleries/nature">
          <div className="shadow-2xl">
            <h4 className="uppercase text-xl text-center">nature</h4>
            <Image
              src={nature}
              alt="#"
              className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
            />
          </div>
        </Link>
        <Link href="/galleries/light">
          <div className="shadow-2xl">
            <h4 className="uppercase text-xl text-center">light</h4>
            <Image
              src={light}
              alt="#"
              className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
            />
          </div>
        </Link>
        <Link href="/galleries/portraits">
          <div className="shadow-2xl">
            <h4 className="uppercase text-xl text-center hover:scale-105 hover:transition-all hover:duration-1000">
              portraits
            </h4>
            <Image
              src={portraits}
              alt="#"
              className="h-52 object-top object-cover hover:scale-105 hover:transition-all hover:duration-1000"
            />
          </div>
        </Link>
        <Link href="/galleries/videography">
          <div className="shadow-2xl">
            <h4 className="uppercase text-xl text-center">videography</h4>
            <Image
              src={videography}
              alt="#"
              className="h-52 object-cover hover:scale-105 hover:transition-all hover:duration-1000"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Galleries;
