import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

function DashboardLayout({ children }) {
  return (
    <>
      <DashboardHeader />
      <main>{children}</main>
      <DashboardFooter />
    </>
  );
}

export default DashboardLayout;
