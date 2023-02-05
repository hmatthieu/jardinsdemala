import * as React from "react";
import Helmet from "react-helmet";
import { fromAPI } from "../technical/fromAPI";
import {
  Content,
  OffsetContentBoth,
  OffsetContentLeft,
  Page,
  Title,
} from "./Page";
import { Markdown } from "./Markdown";
import {
  Description,
  Discover,
  LinkedArticle,
  LinkedArticlesContainer,
  LinkedArticlesList,
  Share,
  Tag,
  TagsContainer,
} from "./ArticlePage.styles";
import { Facebook } from "../assets/images/facebook";
import { ButtonLink } from "./ButtonLink";
import { ORANGE, StrapiColor, StrapiToColors } from "../constant/Colors";
import { graphql, PageProps } from "gatsby";

const moment = require("moment");

interface ArticleRef {
  id: string;
  title: string;
  path: string;
}

interface Article {
  title: string;
  description: string;
  image?: string;
  content?: string;
  path: string;
  date: Date;
  category: {
    id: string;
    title: string;
    path: string;
  };
  discover: ArticleRef[];
}

interface ContentProps {
  article: Article;
  favicon: string;
}

export default ({
  data,
  pageContext: { article, favicon },
}: PageProps<
  { strapiCategories?: { Couleur: StrapiColor } },
  ContentProps
>) => {
  const color = StrapiToColors[data.strapiCategories?.Couleur] || ORANGE;

  return (
    <>
      <Helmet
        title={article.title}
        link={[{ rel: "icon", href: fromAPI(favicon) }]}
        meta={[
          {
            name: "description",
            content: article.description,
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=0.7",
          },
          {
            property: "og:url",
            content: `https://jardinsdemala.fr${article.path}`,
          },
          { property: "og:type", content: "website" },
          { property: "og:title", content: article.title },
          {
            property: "og:description",
            content: article.description,
          },
          {
            property: "og:image",
            content: fromAPI(article.image),
          },
          { property: "og:locale", content: "FR" },
          { property: "twitter:card", content: "summary_large_image" },
        ]}
      />
      <Page>
        <Content>
          <OffsetContentLeft>
            <Title>{article.title}</Title>
            <TagsContainer>
              <ButtonLink to={article.category.path} color={color}>
                {article.category.title}
              </ButtonLink>
              <Tag color={color}>
                {moment(article.date).format("DD.MM.YYYY")}
              </Tag>
              <Share
                href={`https://www.facebook.com/sharer.php?u=https://jardinsdemala.fr${article.path}`}
                target="_blank"
                color={color}
              >
                <Facebook />
              </Share>
            </TagsContainer>
            <Description>{article.description}</Description>
          </OffsetContentLeft>
          <OffsetContentBoth>
            {article.content && (
              <Markdown accentColor={color}>{article.content}</Markdown>
            )}
          </OffsetContentBoth>
          <LinkedArticlesContainer>
            <Discover color={color}>Découvrir plus</Discover>
            <LinkedArticlesList>
              {article.discover.map(a => (
                <LinkedArticle key={a.id} to={a.path} color={color}>
                  {a.title}
                </LinkedArticle>
              ))}
            </LinkedArticlesList>
          </LinkedArticlesContainer>
        </Content>
      </Page>
    </>
  );
};

export const query = graphql`
  query Couleur($categoryStrapiId: Int) {
    strapiCategories(strapiId: { eq: $categoryStrapiId }) {
      Couleur
    }
  }
`;
