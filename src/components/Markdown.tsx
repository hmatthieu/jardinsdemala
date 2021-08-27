import * as React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { fromAPI } from "../technical/fromAPI";

const BaseMarkdown = styled(ReactMarkdown)`
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
  }

  p:not(:empty),
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 12px;
  }

  h4 + p {
    margin-top: 0 !important;
  }

  ul {
    padding-inline-start: 20px;
    list-style: disc;
    white-space: initial;
  }

  ol {
    padding-inline-start: 20px;
    list-style: auto;
    white-space: initial;
  }

  ul + p {
    margin-top: -22px;
  }

  img {
    margin-top: 12px;
    margin-bottom: 24px;
  }
`;

export const Markdown = ({ children }: { children: string }) => (
  <BaseMarkdown>
    {children.replace(/\/uploads\//g, fromAPI("/uploads/"))}
  </BaseMarkdown>
);
