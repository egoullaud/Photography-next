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

export const ABOUT_PAGE_QUERY = gql`
  query About {
    abouts {
      aboutPic {
        height
        width
        url
      }
      id
      title
      content {
        html
      }
    }
  }
`;
export const HERO_PAGE_QUERY = gql`
  query Hero {
    heroes {
      id
      isCurrentVersion
      heroImage {
        height
        url
        width
      }
      heroQuote {
        html
      }
    }
  }
`;

export const SERVICES_PAGE_GUERY = gql`
  query Services {
    services {
      id
      title
      content {
        html
      }
      image {
        height
        url
        width
      }
    }
  }
`;
