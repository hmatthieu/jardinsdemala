import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { PURPLE, StrapiColor, StrapiToColors } from "../../../constant/Colors";
import styled from "styled-components";
import { Content, Page, Title as BaseTitle } from "../../../components/Page";
import Helmet from "react-helmet";
import { fromAPI } from "../../../technical/fromAPI";
import { ButtonLink } from "../../../components/ButtonLink";
import { TABLET } from "../../../constant/Breakpoints";

const chunk = require("lodash.chunk");

const Title = styled(BaseTitle)`
  text-align: center;
  line-height: 3em;
  color: white;
`;

const ArticleList = styled.div`
  > article {
    display: flex;
    justify-content: space-between;
    margin: 48px 0;

    @media (max-width: ${TABLET}px) {
      flex-direction: column;
    }

    > * {
      width: calc(50% - 24px);

      @media (max-width: ${TABLET}px) {
        width: 100%;
      }
    }

    img {
      object-fit: contain;
    }

    h2 {
      margin-top: 48px;
      font-size: 28px;
      font-weight: 700;
      text-transform: uppercase;
    }

    p {
      font-size: 22px;
      line-height: 1.3em;
    }

    a {
      margin-top: 24px;

      @media (max-width: ${TABLET}px) {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      }
    }
  }

  @media (min-width: ${TABLET}px) {
    > article:nth-child(2n) {
      flex-direction: row-reverse;
      text-align: right;
      a {
        float: right;
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  > * {
    margin: 0 6px;
  }
`;

const PaginationLink = styled(Link)<{ color: string }>`
  display: flex;
  height: 32px;
  width: 32px;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
  background-color: white;
  border: 1px solid ${({ color }) => color};
  border-radius: 100px;
  transition: all 0.3s ease;

  &.active {
    pointer-events: none;
  }

  &.active,
  :hover {
    color: white;
    background-color: ${({ color }) => color};
  }
`;

interface SEO {
  Favicon: {
    url: string;
  };
}

interface Article {
  id: string;
  Image: {
    formats: {
      small: {
        url;
      };
    };
    alternativeText: string;
  };
  PDF: {
    url: string;
  } | null;
  Type: "RECETTE" | "ARTICLE";
  Slug: string;
  Titre: string;
  Description: string;
  Date: string;
}

interface Data {
  strapiAccueil: {
    SEO: SEO;
  };
  strapiSousCategories: {
    Titre: string;
    Slug: string;
    Description: string;
    Image: {
      alternativeText: string;
      formats: {
        thumbnail: {
          url: string;
        };
      };
    };
    articles: Article[];
    categorie?: {
      Couleur: StrapiColor;
    };
  };
}

const ArticleCTAMap: Record<Article["Type"], string> = {
  RECETTE: "RECETTE",
  ARTICLE: "LIRE PLUS",
};

export default ({
  data: { strapiAccueil, strapiSousCategories },
  location: { search },
}: PageProps<Data>) => {
  const searchParams = new URLSearchParams(search);
  const pages = chunk(
    strapiSousCategories.articles.sort((a, b) => a.Date.localeCompare(b.Date)),
    4
  );
  const activePage = Math.min(
    parseInt(searchParams.get("page"), 10) || 1,
    pages.length
  );
  const color =
    StrapiToColors[strapiSousCategories.categorie?.Couleur] || PURPLE;

  return (
    <>
      <Helmet
        title={strapiSousCategories.Titre}
        link={[{ rel: "icon", href: fromAPI(strapiAccueil.SEO.Favicon.url) }]}
        meta={[
          {
            name: "description",
            content: strapiSousCategories.Description,
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=0.7",
          },
          {
            property: "og:url",
            content: `https://jardinsdemala.fr/categorie/s/${strapiSousCategories.Slug}`,
          },
          { property: "og:type", content: "website" },
          { property: "og:title", content: strapiSousCategories.Titre },
          {
            property: "og:description",
            content: strapiSousCategories.Description,
          },
          {
            property: "og:image",
            content: fromAPI(strapiSousCategories.Image.formats.thumbnail.url),
          },
          { property: "og:locale", content: "FR" },
          { property: "twitter:card", content: "summary_large_image" },
        ]}
      />
      <Page>
        <Title id="h" style={{ backgroundColor: color }}>
          {strapiSousCategories.Titre}{" "}
        </Title>
        <Content style={{ marginBottom: 96 }}>
          {pages.map((page, index) => (
            <div
              key={index}
              style={{ display: index + 1 === activePage ? "block" : "none" }}
            >
              <ArticleList>
                {page.map(article => (
                  <article key={article.id}>
                    <img
                      src={fromAPI(article.Image.formats.small.url)}
                      alt={article.Image.alternativeText}
                      loading="lazy"
                    />
                    <div>
                      <h2>{article.Titre}</h2>
                      <p>{article.Description}</p>
                      <ButtonLink
                        color={color}
                        to={
                          article.PDF
                            ? fromAPI(article.PDF.url)
                            : `/article/${article.Slug}`
                        }
                      >
                        {ArticleCTAMap[article.Type]}
                      </ButtonLink>
                    </div>
                  </article>
                ))}
              </ArticleList>
            </div>
          ))}
          <Pagination>
            {pages.length > 1 &&
              pages.map((_, index) => (
                <PaginationLink
                  key={index}
                  className={index + 1 === activePage ? "active" : undefined}
                  to={`?page=${index + 1}#h`}
                  activeClassName="active"
                  color={color}
                >
                  {index + 1}
                </PaginationLink>
              ))}
          </Pagination>
        </Content>
      </Page>
    </>
  );
};

export const query = graphql`
  query($id: String) {
    strapiAccueil {
      SEO {
        Favicon {
          url
        }
      }
    }
    strapiSousCategories(id: { eq: $id }) {
      Titre
      Slug
      Description
      Image {
        formats {
          thumbnail {
            url
          }
        }
        alternativeText
      }
      articles {
        Image {
          formats {
            small {
              url
            }
          }
          alternativeText
        }
        PDF {
          url
        }
        Type
        Slug
        Titre
        Description
        Date
        id
      }
      categorie {
        Couleur
      }
    }
  }
`;
