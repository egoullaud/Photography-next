export const PROJECTS_QUERY = gql`
  {
    projects {
      title
      slug
      id
      websiteUrl
      githubUrl
      preview
      coverImage {
        url
      }
      deskImage {
        url
      }

      mobileImage {
        url
      }
      tabletImage {
        url
      }
      description {
        html
      }
      testimonials {
        author
        id
        description {
          html
        }
      }
    }
  }
`;

export const TESTIMONIALS_QUERY = gql`
  {
    testimonials {
      author
      id
      description {
        html
      }
    }
  }
`;
