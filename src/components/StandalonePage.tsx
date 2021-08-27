import * as React from "react";
import Helmet from "react-helmet";
import { fromAPI } from "../technical/fromAPI";
import { Content, OffsetContentBoth, Page, Title } from "./Page";
import { Markdown } from "./Markdown";

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
      <Content style={{ marginBottom: 96 }}>
        <OffsetContentBoth>
          <Title>{page.title}</Title>
          <Markdown>{page.content}</Markdown>
        </OffsetContentBoth>
      </Content>
    </Page>
  </>
);
