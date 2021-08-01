import * as React from "react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { Container, Content, Link, Logo } from "./Header.styles";
import { fromAPI } from "../technical/fromAPI";

interface Image {
  id: string;
  formats: {
    small: {
      url: string;
    };
  };
}

interface Lien {
  id: string;
  Lien: string;
  Texte: string;
}

interface HeaderData {
  strapiEntete: {
    Logo: Image;
    Menu: {
      Liens: Lien[];
    };
  };
}

export const Header = () => {
  const data = useStaticQuery<HeaderData>(graphql`
    query HeaderQuery {
      strapiEntete {
        Logo {
          formats {
            small {
              url
            }
          }
        }
        Menu {
          Liens {
            Lien
            Texte
            id
          }
        }
      }
    }
  `);

  return (
    <Container>
      <Content>
        <GatsbyLink to="/">
          <Logo
            src={fromAPI(data.strapiEntete.Logo.formats.small.url)}
            alt="Jardins de Mala"
          />
        </GatsbyLink>
        <div>
          {data.strapiEntete.Menu.Liens.map(({ id, Texte, Lien }) => (
            <Link key={id} to={Lien}>
              {Texte}
            </Link>
          ))}
        </div>
      </Content>
    </Container>
  );
};
