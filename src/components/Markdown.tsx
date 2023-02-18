import * as React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { fromAPI } from "../technical/fromAPI";
import { PURPLE } from "../constant/Colors";
import * as Color from "color";

const BaseMarkdown = styled(ReactMarkdown)`
  > * {
    white-space: pre-wrap;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${({ $accentColor }) => $accentColor};
  }

  h1 {
    font-size: 46px;
    font-weight: bold;
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
    margin: 12px auto;
  }

  blockquote {
    p {
      border-left: 5px solid
        ${({ $accentColor }) =>
          Color($accentColor)
            .fade(0.5)
            .toString()};
      padding: 12px 24px;
      font-style: italic;
    }
  }

  a {
    color: ${({ $accentColor }) => $accentColor};
    text-decoration: underline;
  }
`;

export const Markdown = ({
  children,
  accentColor,
}: {
  children: string;
  accentColor?: string;
}) => (
  <BaseMarkdown $accentColor={accentColor || PURPLE}>
    {children.replace(/\/uploads\//g, fromAPI("/uploads/"))}
  </BaseMarkdown>
);
