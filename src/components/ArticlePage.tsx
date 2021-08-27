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
  TagLink,
  TagsContainer,
} from "./ArticlePage.styles";
import "../custom-types/assets.d";
import facebookOrange from "../assets/images/facebook-orange.svg";

const moment = require("moment");

interface ArticleRef {
  id: string;
  title: string;
  path: string;
}

interface Article {
  title: string;
  description: string;
  image: string;
  content: string;
  path: string;
  date: Date;
  category: {
    title: string;
    path: string;
  };
  discover: ArticleRef[];
}

interface ContentProps {
  article: Article;
  favicon: string;
}

interface Props {
  pageContext: ContentProps;
}

export default ({ pageContext: { article, favicon } }: Props) => (
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
          content: `https://jardinsdemala.fr/article${article.path}`,
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
            <TagLink to={article.category.path}>
              <Tag>{article.category.title}</Tag>
            </TagLink>
            <Tag>{moment(article.date).format("DD.MM.YYYY")}</Tag>
            <Share style={{ backgroundImage: `url(${facebookOrange})` }} />
          </TagsContainer>
          <Description>{article.description}</Description>
        </OffsetContentLeft>
        <OffsetContentBoth>
          <Markdown>{article.content}</Markdown>
        </OffsetContentBoth>
        <LinkedArticlesContainer>
          <Discover>Découvrir plus</Discover>
          <LinkedArticlesList>
            {article.discover.map(a => (
              <LinkedArticle key={a.id} to={a.path}>
                {a.title}
              </LinkedArticle>
            ))}
          </LinkedArticlesList>
        </LinkedArticlesContainer>
      </Content>
    </Page>
  </>
);
