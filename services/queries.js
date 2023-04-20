import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories(orderBy: listOrder_ASC) {
      title
      id
      slug
    }
  }
`;

export const VIDEOS_BY_CAT = gql`
  {
    videos(where: { category: { title_contains: "videography" } }) {
      title
      id
      description {
        html
      }
      embedUrl
    }
  }
`;

export const IMAGES_BY_SLUG = gql`
  query ImagesBySlug($slug: String!) {
    images(where: { category: { slug: $slug } }) {
      title
      id
      image {
        url
        height
        width
      }
      category {
        title
        id
      }
    }
  }
`;
