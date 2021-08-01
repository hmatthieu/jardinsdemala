import * as React from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";

const Container = styled.div``;

const BannerImage = styled.img`
  max-height: 80vh;
  min-width: 100%;
  object-fit: cover;
`;

const CaptionContainer = styled.div`
  background-color: ${PURPLE};
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Caption = styled.q`
  font-size: 46px;
  font-weight: 700;
  color: white;
  ::after,
  ::before {
    content: "";
  }
`;

interface Props {
  imageURL: string;
  caption: string;
}

export const Banner = ({ imageURL, caption }: Props) => (
  <Container>
    <BannerImage src={imageURL} alt="" />
    <CaptionContainer>
      <Caption>{caption}</Caption>
    </CaptionContainer>
  </Container>
);
