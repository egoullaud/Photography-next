import React from "react";
import Galleries from "@/components/overview/Galleries";
import Hero from "@/components/overview/Hero";
import Services from "@/components/overview/Services";

export default function Overview() {
  return (
    <div>
      <Hero />
      <Services />
      <Galleries />
    </div>
  );
}
