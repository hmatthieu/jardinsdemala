import * as React from "react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { Container, Content, Link, Logo, Menu } from "./Header.styles";
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
            src={fromAPI({
              image: data.strapiEntete.Logo,
              format: "small",
            })}
            alt="Jardins de Mala"
            height={180}
            width={180}
          />
        </GatsbyLink>
        <Menu>
          {data.strapiEntete.Menu.Liens.map(({ id, Texte, Lien }) => (
            <div key={id}>
              <Link href={Lien}>{Texte}</Link>
            </div>
          ))}
        </Menu>
      </Content>
    </Container>
  );
};
