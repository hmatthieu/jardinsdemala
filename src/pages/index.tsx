import * as React from "react";
import Helmet from "react-helmet";
import { Header } from "../components/Header";
import { graphql } from "gatsby";
import { fromAPI } from "../technical/fromAPI";
import { Banner } from "../components/Banner";
import { StrapiColor, StrapiToColors } from "../constant/Colors";
import styled from "styled-components";
import { CategoryCard } from "../components/CategoryCard";
import { SubCategoryItem } from "../components/SubCategoryItem";
import { SocialBanner } from "../components/SocialBanner";
import { Footer } from "../components/Footer";

const HorizontalList = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0;
`;

interface SEO {
  Description: string;
  Favicon: {
    url: string;
  };
  Image: {
    formats: {
      medium: {
        url: string;
      };
    };
  };
  Titre: string;
}

interface SubCategory {
  id: string;
  Titre: string;
  Image: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
}

interface Category {
  id: string;
  Couleur: StrapiColor;
  Description: string;
  Titre: string;
  Image: {
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

interface Props {
  data: {
    strapiAccueil: {
      SEO: SEO;
      Bandeau: {
        Citation: string;
        Image: {
          formats: {
            large: {
              url: string;
            };
            small: {
              url: string;
            };
          };
        };
        ActionPrincipale: {
          Accroche: string;
          Lien: string;
          Image: {
            formats: {
              thumbnail: {
                url: string;
              };
            };
            alternativeText: string;
          };
        };
      };
      categories: Category[];
      SousCategories: SubCategory[];
    };
  };
}

const Landing = ({ data }: Props) => (
  <>
    <Helmet
      title={data.strapiAccueil.SEO.Titre}
      link={[
        { rel: "icon", href: fromAPI(data.strapiAccueil.SEO.Favicon.url) },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "true",
        },
        {
          href:
            "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
          rel: "stylesheet",
        },
      ]}
      htmlAttributes={{
        lang: "fr",
      }}
      meta={[
        {
          name: "description",
          content: data.strapiAccueil.SEO.Description,
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=0.7",
        },
        { property: "og:url", content: fromAPI("") },
        { property: "og:type", content: "website" },
        { property: "og:title", content: data.strapiAccueil.SEO.Titre },
        {
          property: "og:description",
          content: data.strapiAccueil.SEO.Description,
        },
        {
          property: "og:image",
          content: fromAPI(data.strapiAccueil.SEO.Image.formats.medium.url),
        },
        { property: "og:locale", content: "FR" },
        { property: "twitter:card", content: "summary_large_image" },
      ]}
    />
    <Header />
    <Banner
      lowImageURL={fromAPI(data.strapiAccueil.Bandeau.Image.formats.small.url)}
      imageURL={fromAPI(data.strapiAccueil.Bandeau.Image.formats.large.url)}
      caption={data.strapiAccueil.Bandeau.Citation}
      cta={{
        text: data.strapiAccueil.Bandeau.ActionPrincipale.Accroche,
        imageURL: fromAPI(
          data.strapiAccueil.Bandeau.ActionPrincipale.Image.formats.thumbnail
            .url
        ),
        imageAlt:
          data.strapiAccueil.Bandeau.ActionPrincipale.Image.alternativeText,
        link: data.strapiAccueil.Bandeau.ActionPrincipale.Lien,
      }}
    />
    <HorizontalList>
      {data.strapiAccueil.categories.map(category => (
        <CategoryCard
          key={category.id}
          title={category.Titre}
          color={StrapiToColors[category.Couleur]}
          imageURL={fromAPI(category.Image.formats.medium.url)}
          description={category.Description}
        />
      ))}
    </HorizontalList>
    <HorizontalList>
      {data.strapiAccueil.SousCategories.map(subCategory => (
        <SubCategoryItem
          key={subCategory.id}
          title={subCategory.Titre}
          imageURL={fromAPI(subCategory.Image.formats.thumbnail.url)}
        />
      ))}
    </HorizontalList>
    <SocialBanner />
    <Footer />
  </>
);

export const query = graphql`
  query LandingQuery {
    strapiAccueil {
      SEO {
        Description
        Favicon {
          url
        }
        Image {
          formats {
            medium {
              url
            }
          }
        }
        Titre
      }
      Bandeau {
        Citation
        Image {
          formats {
            large {
              url
            }
            small {
              url
            }
          }
        }
        ActionPrincipale {
          Accroche
          Lien
          Image {
            formats {
              thumbnail {
                url
              }
            }
            alternativeText
          }
        }
      }
      categories {
        Couleur
        Description
        Titre
        id
        Image {
          formats {
            medium {
              url
            }
          }
        }
      }
      SousCategories {
        id
        Titre
        Image {
          formats {
            thumbnail {
              url
            }
          }
        }
      }
    }
  }
`;

export default Landing;
