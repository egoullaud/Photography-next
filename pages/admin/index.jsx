import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardAside from "../../components/DashboardAside";

function dashboard() {
  return (
    <DashboardLayout>
      <div className="flex">
        <DashboardAside />

        <div></div>
      </div>
    </DashboardLayout>
  );
}

export default dashboard;
