import * as React from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";
import { Button } from "./Button";

const Container = styled.div`
  background-color: ${PURPLE};
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
  > *:not(:last-child) {
    margin-right: 12px;
  }
`;

export const SocialBanner = () => {
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
            <div style={{ height: 60, width: 60, background: "white" }} />
            <div style={{ height: 60, width: 60, background: "white" }} />
            <div style={{ height: 60, width: 60, background: "white" }} />
          </SocialButtons>
        </Item>
      </Content>
    </Container>
  );
};
