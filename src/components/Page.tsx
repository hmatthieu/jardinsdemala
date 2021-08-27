import * as React from "react";
import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SocialBanner } from "./SocialBanner";
import styled from "styled-components";
import { MAX_WIDTH_CONTENT } from "../constant/Sizes";
import { handleCMSClick } from "../technical/handleCMSClick";
import { NUNITO } from "../constant/Fonts";
import Helmet from "react-helmet";
import { LAPTOP, TABLET } from "../constant/Breakpoints";

export const Title = styled.h1`
  font-size: 46px;
  font-weight: bold;
  font-family: ${NUNITO};
`;

export const Content = styled.div`
  max-width: ${MAX_WIDTH_CONTENT}px;
  margin: auto;
  padding: 0 42px;
`;

export const OffsetContentLeft = styled.div`
  margin-left: 256px;

  @media (max-width: ${LAPTOP}px) {
    margin-left: 128px;
  }

  @media (max-width: ${TABLET}px) {
    margin-left: 0;
  }
`;

export const OffsetContentBoth = styled.div`
  margin: 0 256px;

  @media (max-width: ${LAPTOP}px) {
    margin: 0 128px;
  }

  @media (max-width: ${TABLET}px) {
    margin: 0;
  }
`;

const Main = styled.div`
  margin-top: 42px;
`;

export const Page = ({ children }: PropsWithChildren<{}>) => (
  <>
    <Helmet
      link={[
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
    />
    <Header />
    <Main onClick={handleCMSClick}>{children}</Main>
    <SocialBanner />
    <Footer />
  </>
);
