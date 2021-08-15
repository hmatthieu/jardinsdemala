import * as React from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";

const Container = styled.div`
  margin: 24px;
  color: ${PURPLE};

  :hover {
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 28px;
  margin: 14px;
`;

const Image = styled.img`
  height: 120px;
  min-height: 120px;
  width: 120px;
  min-width: 120px;
  margin: auto;
`;

interface Props {
  title: string;
  imageURL: string;
}

export const SubCategoryItem = ({ title, imageURL }: Props) => (
  <Container>
    <Image src={imageURL} alt={title} />
    <Title>{title}</Title>
  </Container>
);
