import React from "react";

export async function search(options = {}) {
  const params = {
    ...options,
  };

  // caused error undefined next_cursor
  if (options.nextCursor) {
    params.next_cursor = options.nextCursor;
    delete params.nextCursor;
  }

  const paramString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search?sort_by[][public_id]=asc&${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.NEXT_PUBLIC_CLOUD_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json());
  return results;
}

export function mapImageResources(resources) {
  return resources.map((resource) => {
    console.log(resource);
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    };
  });
}

export async function getFolders(options = {}) {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/folders`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.NEXT_PUBLIC_CLOUD_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json());
  return results;
}
