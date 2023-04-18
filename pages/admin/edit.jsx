import { gql } from "@apollo/client";
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function edit() {}
return (
  <DashboardLayout>
    <div className="flex">
      <div className="w-[20%]">Aside</div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="uppercase text-3xl text-center mt-[2rem] tracking-wider">
          Edit Galleries
        </h2>
      </div>
    </div>
  </DashboardLayout>
);

export default DashboardLayout(edit);

// Mutations

//Edit Photo - select photo
export const SELECT_PHOTO = gql`
  mutation selectPhoto($slug: String!) {
    updateImage(data: { selected: "true" }, where: { slug: $slug })
  }
`;

//Add Photo
export const CREATE_IMAGE_MUTATION = gql`
  mutation createImage {
    createImage(
      data: {
        title: ""
        slug: ""
        image: { create: { fileName: "", height: 1.5, width: 1.5 } }
        category: { connect: { slug: "" } }
      }
    ) {
      id
      category {
        slug
        title
      }
      slug
      title
      image {
        height
        id
        url
        width
      }
    }
  }
`;

// Delete Selected Photos
export const DELETE_SELECTED_MUTATION = gql`
  mutation deleteSelected {
    deleteImage(where: { selected: true })
  }
`;

//publish changed photo
export const PUBLISH_IMAGE = gql`
  mutation publishImage {
    publishImage(where: { slug: "" }, to: PUBLISHED) {
      slug
    }
  }
`;
