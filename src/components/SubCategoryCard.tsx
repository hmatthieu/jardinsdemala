import * as React from "react";
import styled from "styled-components";
import { TABLET } from "../constant/Breakpoints";

interface Colored {
  color: string;
}

const Container = styled.div`
  margin: 12px;
`;

const Title = styled.h2<Colored>`
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 28px;
  margin: 14px;
  color: ${({ color }) => color};
`;

const Card = styled.div<Colored & { background: string }>`
  position: relative;
  overflow: hidden;
  height: 280px;
  width: 280px;

  @media (max-width: ${TABLET}px) {
    height: 200px;
    width: 200px;
  }

  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;

  &::before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(${({ background }) => background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 1;
    transform: scale(1);
    transition: 0.3s ease all;
  }

  &:hover::before {
    transform: scale(1.2);
    opacity: 0;
  }

  > p {
    font-size: 22px;
    color: white;
    opacity: 0;
    text-align: center;
    transition: 0.3s ease all;

    @media (max-width: ${TABLET}px) {
      font-size: 22px;
    }
  }

  &:hover > p {
    opacity: 1;
  }
`;

interface Props {
  title: string;
  color: string;
  imageURL: string;
  description: string;
}

export const SubCategoryCard = ({
  title,
  color,
  imageURL,
  description,
}: Props) => (
  <Container>
    <Title color={color}>{title}</Title>
    <Card background={imageURL} color={color}>
      <p>{description}</p>
    </Card>
  </Container>
);
