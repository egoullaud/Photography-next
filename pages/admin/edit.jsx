import React from "react";
import UploadAssetForm from "../../components/UploadAssetForm";
import DashboardLayout from "../../components/DashboardLayout";

export default function Edit() {
  return (
    <div>
      <DashboardLayout>
        <UploadAssetForm />
      </DashboardLayout>
      <script
        defer
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      ></script>
    </div>
  );
}
