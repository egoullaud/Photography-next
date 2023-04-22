import React from "react";
import UploadAssetForm from "../../components/UploadAssetForm";
import DashboardLayout from "../../components/DashboardLayout";

export default function Edit() {
  return (
    <div>
      <DashboardLayout>
        <UploadAssetForm />
      </DashboardLayout>
    </div>
  );
}
