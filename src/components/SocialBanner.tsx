import * as React from "react";
import { FormEventHandler, useCallback, useState } from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";
import { Button } from "./Button";
import "../custom-types/assets.d";
import instagram from "../assets/images/instagram.svg";
import facebook from "../assets/images/facebook.svg";
import { graphql, useStaticQuery } from "gatsby";
import { TABLET } from "../constant/Breakpoints";

enum Network {
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
}

const NetworkImage: Record<Network, string> = {
  [Network.INSTAGRAM]: instagram,
  [Network.FACEBOOK]: facebook,
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

  @media (max-width: ${TABLET}px) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  z-index: 1;

  @media (max-width: ${TABLET}px) {
    > p {
      margin: 12px 0;
      text-align: center;
    }
  }

  @media (min-width: ${TABLET}px) {
    display: flex;

    :last-child {
      justify-content: flex-end;
    }

    > p {
      position: absolute;
      transform: translateY(-120%);
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
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
  justify-content: center;
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
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const handleEmailSubmit = useCallback<FormEventHandler>(
    async e => {
      const form = e.currentTarget as HTMLFormElement;
      if (form.checkValidity()) {
        e.preventDefault();
        setEmailLoading(true);

        try {
          await fetch(
            "https://8d5dccf0.sibforms.com/serve/MUIEAJVKIZk9Z-cuUO8seN01ATG9SlKE8158k4Q6p_4kipTcO_iszq_Ysnoe0-KN0mJu8tznydGlo3cCotEDxys3cze3FKnqle-8j7oogs8PF2HiylSnEHcplSQN-oU-3cPeHlrwtXr1B_buIUadWfONw4jr7MnYVHNzWRnemdhd972wtgtbil_P7UEU3RUj1vx6c8KFSkRxluwz",
            {
              method: "POST",
              body: new FormData(form),
            }
          );
          setEmailSent(true);
        } catch (e) {
          console.error(e);
        } finally {
          setEmailLoading(false);
        }
      }
    },
    [setEmailSent, setEmailLoading]
  );

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
        {emailSent ? (
          <Text>✅ Nous avons bien enregistré votre email !</Text>
        ) : (
          <Item>
            <Text>On reste ensemble ?</Text>
            <form onClick={handleEmailSubmit}>
              <InputContainer>
                <Input
                  disabled={emailLoading}
                  placeholder="Email"
                  type="email"
                  id="EMAIL"
                  name="EMAIL"
                  required
                />
                <Button loading={emailLoading} type="submit">
                  Je m'abonne
                </Button>
              </InputContainer>
            </form>
          </Item>
        )}

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
