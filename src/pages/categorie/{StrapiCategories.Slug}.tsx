import * as React from "react";
import { graphql, Link } from "gatsby";
import { StrapiColor, StrapiToColors } from "../../constant/Colors";
import styled from "styled-components";
import { Content, OffsetContentLeft, Page, Title } from "../../components/Page";
import Helmet from "react-helmet";
import { fromAPI } from "../../technical/fromAPI";
import { SubCategoryCard } from "../../components/SubCategoryCard";

const CategoryImg = styled.img`
  display: inline-block;
  min-height: 80px;
  height: 80px;
  width: 80px;
  min-width: 80px;
  object-fit: contain;
`;

const Description = styled.p`
  font-size: 18px;
  margin-top: 48px;
  margin-bottom: 24px;
  font-weight: bold;
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 24px 0;
`;

interface SEO {
  Favicon: {
    url: string;
  };
}

interface SubCategory {
  Image: {
    formats: {
      small: {
        url;
      };
    };
    alternativeText: string;
  };
  Description: string;
  Titre: string;
  Slug: string;
  id: string;
}

interface Props {
  data: {
    strapiAccueil: {
      SEO: SEO;
    };
    strapiCategories: {
      Couleur: StrapiColor;
      Titre: string;
      Slug: string;
      Entete: string;
      Description: string;
      Image?: {
        alternativeText: string;
        formats: {
          thumbnail: {
            url: string;
          };
        };
      };
      sous_categories: SubCategory[];
    };
  };
}

export default ({ data: { strapiAccueil, strapiCategories } }: Props) => (
  <>
    <Helmet
      title={strapiCategories.Titre}
      link={[{ rel: "icon", href: fromAPI(strapiAccueil.SEO.Favicon.url) }]}
      meta={[
        {
          name: "description",
          content: strapiCategories.Description,
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=0.7",
        },
        {
          property: "og:url",
          content: `https://jardinsdemala.fr/categorie/${strapiCategories.Slug}`,
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: strapiCategories.Titre },
        {
          property: "og:description",
          content: strapiCategories.Description,
        },
        {
          property: "og:image",
          content: fromAPI({
            image: strapiCategories.Image,
            format: "thumbnail",
          }),
        },
        { property: "og:locale", content: "FR" },
        { property: "twitter:card", content: "summary_large_image" },
      ]}
    />
    <Page>
      <Content style={{ marginBottom: 96 }}>
        <OffsetContentLeft>
          <Title style={{ color: StrapiToColors[strapiCategories.Couleur] }}>
            {strapiCategories.Titre}{" "}
            <CategoryImg
              src={fromAPI({
                image: strapiCategories.Image,
                format: "thumbnail",
              })}
              alt={strapiCategories.Image?.alternativeText}
            />
          </Title>
          <Description>{strapiCategories.Entete}</Description>
        </OffsetContentLeft>
        <CategoryList>
          {strapiCategories.sous_categories.map(subCat => (
            <Link to={`/categorie/s/${subCat.Slug}`}>
              <SubCategoryCard
                key={subCat.id}
                title={subCat.Titre}
                color={StrapiToColors[strapiCategories.Couleur]}
                imageURL={fromAPI({
                  image: subCat.Image,
                  format: "small",
                })}
                description={subCat.Description}
              />
            </Link>
          ))}
        </CategoryList>
      </Content>
    </Page>
  </>
);

export const query = graphql`
  query($id: String) {
    strapiAccueil {
      SEO {
        Favicon {
          url
        }
      }
    }
    strapiCategories(id: { eq: $id }) {
      Couleur
      Description
      Image {
        formats {
          thumbnail {
            url
          }
        }
      }
      Entete
      Titre
      Slug
      sous_categories {
        Image {
          formats {
            small {
              url
            }
          }
          alternativeText
        }
        Description
        Titre
        Slug
        id
      }
    }
  }
`;
