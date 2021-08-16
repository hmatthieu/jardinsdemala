import * as React from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";

const Container = styled.div`
  margin: 24px;
`;

const Title = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 28px;
  margin: 14px;
  color: ${PURPLE};
`;

const Image = styled.img`
  height: 120px;
  min-height: 120px;
  width: 120px;
  min-width: 120px;
  margin: auto;
  object-fit: contain;
  transform: scale(1);
  transition: transform 0.3s ease;

  ${Container}:hover & {
    transform: scale(1.1);
  }
`;

interface Props {
  title: string;
  imageURL: string;
}

export const SubCategoryItem = ({ title, imageURL }: Props) => (
  <Container>
    <Image src={imageURL} alt={title} height={120} width={120} />
    <Title>{title}</Title>
  </Container>
);
