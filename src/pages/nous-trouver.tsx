import * as React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { fromAPI } from "../technical/fromAPI";
import { Content, Page, Title } from "../components/Page";
import { SafeMountMapComponent } from "../components/map";
import styled from "styled-components";
import { TABLET } from "../constant/Breakpoints";
import { PURPLE } from "../constant/Colors";

const Container = styled(Content)`
  position: relative;
  width: 100%;
  height: 400px;
  min-height: 400px;

  > div {
    padding: 24px;
    > div {
      border: 1px solid ${PURPLE};
    }
  }

  @media (max-width: ${TABLET}px) {
    padding: 0;
  }
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

interface Identity {
  Entreprise: string;
  Adresse: {
    GoogleMap: string;
    Longue: string;
    Position: {
      Latitude: number;
      Longitude: number;
    };
  };
}

interface Props {
  data: {
    strapiAccueil: {
      SEO: SEO;
    };
    strapiIdentite: Identity;
  };
}

const Landing = ({ data }: Props) => (
  <>
    <Helmet
      title="Nous trouver"
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
        { property: "og:title", content: "Nous trouver" },
        {
          property: "og:description",
          content: data.strapiAccueil.SEO.Description,
        },
        {
          property: "og:image",
          content: fromAPI({
            image: data.strapiAccueil.SEO.Image,
            format: "medium",
          }),
        },
        { property: "og:locale", content: "FR" },
        { property: "twitter:card", content: "summary_large_image" },
      ]}
    />
    <Page>
      <Content>
        <Title>Nous Trouver</Title>

        <address>
          {data.strapiIdentite.Entreprise}
          <br />
          {data.strapiIdentite.Adresse.Longue}
        </address>
      </Content>

      <Container>
        <SafeMountMapComponent
          markers={[
            {
              text: `${data.strapiIdentite.Entreprise} ➡`,
              href: data.strapiIdentite.Adresse.GoogleMap,
              position: [
                data.strapiIdentite.Adresse.Position.Latitude,
                data.strapiIdentite.Adresse.Position.Longitude,
              ],
            },
          ]}
        />
      </Container>
    </Page>
  </>
);

export const query = graphql`
  query FindUsQuery {
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
    }

    strapiIdentite {
      Entreprise
      Adresse {
        GoogleMap
        Longue
        Position {
          Latitude
          Longitude
        }
      }
    }
  }
`;

export default Landing;
