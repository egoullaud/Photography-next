import React from "react";
import Image from "next/image";
import heroImg from "../public/hero-img.jpg";

function Hero({ heroes }) {
  return (
    <>
      {heroes.map((hero) => (
        <div
          key={hero.id}
          className="flex flex-col items-center justify-center  lg:mt-[5rem]"
        >
          {/* Hero area */}
          <div
            className="flex justify-center items-center text-center m-4
                        md:text-xl md:mx-[2rem]
                        lg:text-3xl lg:mb-[5rem]"
          >
            <p
              dangerouslySetInnerHTML={{ __html: hero.heroQuote.html }}
              className="tracking-wider"
            ></p>
          </div>
          <Image
            priority
            src={hero.heroImage.url}
            alt="#"
            height={hero.heroImage.height}
            width={hero.heroImage.width}
          />
        </div>
      ))}
    </>
  );
}

export default Hero;
