import * as React from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";
import { Button } from "./Button";
import "../custom-types/assets.d";
import instagram from "../assets/images/instagram.svg";
import facebook from "../assets/images/facebook.svg";
import mail from "../assets/images/mail.svg";
import { graphql, useStaticQuery } from "gatsby";

enum Network {
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  EMAIL = "Email",
}

const NetworkImage: Record<Network, string> = {
  [Network.INSTAGRAM]: instagram,
  [Network.FACEBOOK]: facebook,
  [Network.EMAIL]: mail,
};

interface Social {
  id: string;
  Lien: string;
  Reseau: Network;
}

interface SocialData {
  strapiReseauxSociaux: {
    Social: Social[];
  };
}

const Container = styled.div`
  background-color: ${PURPLE};
  padding: 0 42px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 64px 0;
  max-width: 1400px;
  margin: auto;
`;

const Item = styled.div`
  display: flex;
  z-index: 1;

  :last-child {
    justify-content: flex-end;
  }

  > p {
    position: absolute;
    transform: translateY(-120%);
  }
`;

const Input = styled.input`
  border: 2px solid white;
  padding: 12px;
  min-width: 88px;
  background: transparent;
  color: white;
  font-weight: 700;
  font-size: 20px;
  margin-right: 12px;

  ::placeholder {
    color: white;
  }

  :focus {
    outline: none;
  }
`;

const Text = styled.p`
  color: white;
  font-weight: 700;
  font-size: 20px;
`;

const SocialButtons = styled.div`
  display: flex;
  color: white;
  > *:not(:last-child) {
    margin-right: 12px;
  }
  img {
    height: 60px;
    width: 60px;
    transition: all 0.3s ease;
    :hover {
      transform: scale(1.1);
    }
  }
`;

export const SocialBanner = () => {
  const data = useStaticQuery<SocialData>(graphql`
    query SocialBannerQuery {
      strapiReseauxSociaux {
        Social {
          Lien
          Reseau
          id
        }
      }
    }
  `);

  return (
    <Container>
      <Content>
        <Item>
          <Text>On reste ensemble ?</Text>
          <Input placeholder="Email" />
          <Button>Je m'abonne</Button>
        </Item>

        <Item>
          <Text>Suivre les Jardins de Mala</Text>
          <SocialButtons>
            {data.strapiReseauxSociaux.Social.map(({ id, Lien, Reseau }) => (
              <a key={id} href={Lien} target="_blank">
                <img src={NetworkImage[Reseau]} alt={Reseau} />
              </a>
            ))}
          </SocialButtons>
        </Item>
      </Content>
    </Container>
  );
};
