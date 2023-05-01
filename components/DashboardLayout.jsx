import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardAside from "./DashboardAside";

function DashboardLayout({ children, categories }) {
  return (
    <>
      <DashboardHeader />
      <DashboardAside categories={categories} />
      <main className="ml-[4rem]">{children}</main>
    </>
  );
}

export default DashboardLayout;
