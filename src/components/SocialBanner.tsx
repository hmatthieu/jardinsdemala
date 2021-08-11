import * as React from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";

const Container = styled.div`
  background-color: ${PURPLE};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 32px;
  max-width: 1400px;
  margin: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: 0 12px;
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

export const SocialBanner = () => {
  return (
    <Container>
      <Content>
        <Item>
          <Text>On reste ensemble ?</Text>
          <Input placeholder="Email" />
        </Item>

        <Item>
          <Text>Suivre les Jardins de Mala</Text>
          <div style={{ height: 60, width: 60, background: "white" }} />
          <div style={{ height: 60, width: 60, background: "white" }} />
          <div style={{ height: 60, width: 60, background: "white" }} />
        </Item>
      </Content>
    </Container>
  );
};
