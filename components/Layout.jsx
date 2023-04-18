import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({ children, categories }) {
  return (
    <>
      <NavBar categories={categories} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
