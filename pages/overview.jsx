import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Galleries from "../components/Galleries";
import NavBar from "../components/NavBar";
import client from "../apolloClient";

import { gql } from "@apollo/client";

export default function Overview() {
  return (
    <div>
      <Hero />
      <Services />
      <Galleries />
    </div>
  );
}
