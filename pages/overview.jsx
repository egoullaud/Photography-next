import React from "react";
import Galleries from "@/components/Galleries";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Overview() {
  return (
    <div>
      <Hero />
      <Services />
      <Galleries />
    </div>
  );
}
