import * as React from "react";
import { graphql } from "gatsby";
import StandalonePage from "../components/StandalonePage";

interface SEO {
  Description: string;
  Favicon: {
    url: string;
  };
  Image: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  Titre: string;
}

interface Props {
  data: {
    strapiPages: {
      Contenu?: string;
      SEO?: SEO;
      Slug: string;
      Titre: string;
    };
    strapiAccueil: {
      SEO: SEO;
    };
  };
}

export default ({ data: { strapiPages, strapiAccueil } }: Props) => (
  <StandalonePage
    page={{
      title: strapiPages.Titre,
      path: `/${strapiPages.Slug}`,
      seo: strapiPages.SEO
        ? {
            title: strapiPages.SEO.Titre,
            description: strapiPages.SEO.Description,
            favicon: strapiPages.SEO.Favicon.url,
            image: strapiPages.SEO.Image.formats.thumbnail.url,
          }
        : {
            description: strapiAccueil.SEO.Description,
            favicon: strapiAccueil.SEO.Favicon.url,
            image: strapiAccueil.SEO.Image.formats.thumbnail.url,
          },
    }}
  />
);

export const query = graphql`
  query($id: String) {
    strapiPages(id: { eq: $id }) {
      Contenu
      SEO {
        Description
        Favicon {
          url
        }
        Image {
          formats {
            thumbnail {
              url
            }
          }
        }
        Titre
      }
      Slug
      Titre
    }
    strapiAccueil {
      SEO {
        Description
        Favicon {
          url
        }
        Image {
          formats {
            thumbnail {
              url
            }
          }
        }
        Titre
      }
    }
  }
`;
