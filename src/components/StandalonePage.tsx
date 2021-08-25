import styled from "styled-components";
import * as React from "react";
import Helmet from "react-helmet";
import { fromAPI } from "../technical/fromAPI";
import { Content, Page, Title } from "./Page";
import ReactMarkdown from "react-markdown";

const Markdown = styled(ReactMarkdown)`
  > * {
    white-space: pre-wrap;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 22px;
  }

  h4 {
    font-size: 18px;
  }

  h4 {
    font-weight: bold;
    margin-bottom: 12px;
  }

  p:not(:empty),
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 12px;
  }

  ul {
    padding-inline-start: 20px;
    list-style: disc;
  }

  ul + p {
    margin-top: -22px;
  }
`;

export interface SEO {
  title?: string;
  description: string;
  image: string;
  favicon: string;
}

interface Page {
  title: string;
  content: string;
  path: string;
  seo: SEO;
}

interface ContentProps {
  page: Page;
}

interface Props {
  pageContext: ContentProps;
}

export default ({ pageContext: { page } }: Props) => (
  <>
    <Helmet
      title={page.title}
      link={[{ rel: "icon", href: fromAPI(page.seo.favicon) }]}
      meta={[
        {
          name: "description",
          content: page.seo.description,
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=0.7",
        },
        {
          property: "og:url",
          content: `https://jardinsdemala.fr${page.path}`,
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: page.seo.title || page.title },
        {
          property: "og:description",
          content: page.seo.description,
        },
        {
          property: "og:image",
          content: fromAPI(page.seo.image),
        },
        { property: "og:locale", content: "FR" },
        { property: "twitter:card", content: "summary_large_image" },
      ]}
    />
    <Page>
      <Content>
        <Title>{page.title}</Title>
        <Markdown>{page.content}</Markdown>
      </Content>
    </Page>
  </>
);
