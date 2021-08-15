import * as React from "react";
import { useCallback, useState } from "react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { GREEN_LIGHT } from "../constant/Colors";
import { MAX_WIDTH_CONTENT } from "../constant/Sizes";
import { fromAPI } from "../technical/fromAPI";

interface Image {
  formats: {
    small: {
      url: string;
    };
  };
  url: string;
  alternativeText: string;
}

interface Lien {
  id: string;
  Lien: string;
  Texte: string;
}

interface Category {
  id: string;
  Titre: string;
  Slug: string;
}

interface Identity {
  Contact: string;
  Entreprise: string;
  Telephone: string;
  Adresse: {
    Courte: string;
  };
}

interface FooterData {
  strapiPiedDePage: {
    Menu: {
      Liens: Lien[];
    };
    Legal: {
      Liens: Lien[];
    };
    Illustration: Image;
    Categories: Category[];
  };
  strapiIdentite: Identity;
}

const FooterContainer = styled.footer`
  margin-top: -146px;
`;

const Container = styled.div`
  background-color: ${GREEN_LIGHT};
  padding: 42px;
`;

const Content = styled.div`
  max-width: ${MAX_WIDTH_CONTENT}px;
  margin: auto;
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: space-between;

  > div:last-child {
    text-align: right;
  }
`;

const MenuContainer = styled.div`
  display: flex;

  > nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 24px;

    :first-child {
      margin-left: 0;
    }
  }
`;

const Link = styled(GatsbyLink)``;

const Illustration = styled.img<{ lowSrc?: string }>`
  min-height: 370px;
  position: relative;
  height: 370px;
  top: 85px;
  object-fit: contain;
  margin: auto;
  background-size: contain;
  background-position: center;
  ${({ lowSrc }) =>
    lowSrc &&
    `
    background-image: url(${lowSrc});
  `}
`;

export const Footer = () => {
  const data = useStaticQuery<FooterData>(graphql`
    query MyQuery {
      strapiPiedDePage {
        Legal {
          Liens {
            Texte
            Lien
            id
          }
        }
        Illustration {
          url
          formats {
            small {
              url
            }
          }
          alternativeText
        }
        Menu {
          Liens {
            id
            Texte
            Lien
          }
        }
        Categories {
          Titre
          id
          Slug
        }
      }
      strapiIdentite {
        Contact
        Entreprise
        Telephone
        Adresse {
          Courte
        }
      }
    }
  `);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, [setImageLoaded]);

  return (
    <FooterContainer>
      <Illustration
        lowSrc={
          imageLoaded
            ? undefined
            : fromAPI(data.strapiPiedDePage.Illustration.formats.small.url)
        }
        src={fromAPI(data.strapiPiedDePage.Illustration.url)}
        alt={data.strapiPiedDePage.Illustration.alternativeText}
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <Container>
        <Content>
          <MenuContainer>
            <nav>
              {data.strapiPiedDePage.Menu.Liens.map(({ id, Texte, Lien }) => (
                <Link id={id} style={{ fontWeight: 700 }} to={Lien}>
                  {Texte}
                </Link>
              ))}
            </nav>
            <nav>
              {data.strapiPiedDePage.Categories.map(({ id, Titre, Slug }) => (
                <Link id={id} to={`/${Slug}`}>
                  {Titre}
                </Link>
              ))}
            </nav>
            <nav>
              {data.strapiPiedDePage.Legal.Liens.map(({ id, Texte, Lien }) => (
                <Link id={id} to={Lien}>
                  {Texte}
                </Link>
              ))}
            </nav>
          </MenuContainer>
          <div>
            <p>{data.strapiIdentite.Entreprise}</p>
            <p>{data.strapiIdentite.Adresse.Courte}</p>
            <p>{data.strapiIdentite.Telephone}</p>
            <p>{data.strapiIdentite.Contact}</p>
          </div>
        </Content>
      </Container>
    </FooterContainer>
  );
};
