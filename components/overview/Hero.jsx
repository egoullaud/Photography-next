import React from "react";
import Image from "next/image";
import heroImg from "../../public/hero/hero-img.jpg";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero area */}
      <div
        className="flex justify-center items-center text-center m-4
                        md:text-xl md:mx-[2rem]
                        lg:text-3xl lg:my-[2rem]"
      >
        <p className="italic tracking-wider">
          “When words become unclear, I shall focus with photographs. When
          images become inadequate, I shall be content with silence.”
          <br />
          <span className="not-italic">— Ansel Adams</span>
        </p>
      </div>
      <Image priority src={heroImg} className="" alt="/" />
    </div>
  );
}

export default Hero;
