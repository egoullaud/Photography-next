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
    `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/search?sort_by[][public_id]=asc&${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUD_API_KEY + ":" + process.env.CLOUD_SECRET
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
    `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/folders`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUD_API_KEY + ":" + process.env.CLOUD_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json());
  return results;
}

// export async function updatePositions(images) {
//   // Iterate through the list of images and update the "position" metadata field
//   for (let i = 0; i < images.length; i++) {
//     const image = images[i];

//     // Update the "position" metadata field for the image using the Fetch API
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/update`,
//       {

//         method: "PUT",
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             process.env.CLOUD_API_KEY + ":" + process.env.CLOUD_SECRET
//           ).toString("base64")}`,
//         },
//         body: JSON.stringify({
//           public_id: image.public_id,
//           metadata: { position: i + 1 },
//           api_key: process.env.CLOUD_API_KEY,
//           api_secret: process.env.CLOUD_SECRET,
//         }),
//       }
//     );

//     const result = await response.json();
//     console.log(result);
//   }
// }
