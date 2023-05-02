import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardAside from "./DashboardAside";

function DashboardLayout({ children }) {
  return (
    <>
      <DashboardAside />
      <main className="ml-[4rem]">{children}</main>
    </>
  );
}

export default DashboardLayout;
