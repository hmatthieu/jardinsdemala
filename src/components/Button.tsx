import * as React from "react";
import { ButtonHTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";
import { Loading as LoadingIcon } from "../assets/images/Loading";
import { PURPLE } from "../constant/Colors";

export const rotate = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

const Loading = styled(LoadingIcon)`
  height: 40px;
  animation: 1s ${rotate} infinite linear;
  color: ${PURPLE};
  margin-right: 12px;
`;

interface ButtonBaseProps {
  shadow?: boolean;
  small?: boolean;
}

const BaseButton = styled.button<ButtonBaseProps>`
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid white;
  color: ${PURPLE};
  outline: none;
  box-shadow: none;
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  text-align: center;
  padding: 0 24px;
  height: 58px;
  min-width: 190px;
  transition: all 0.3s ease;

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    outline: none;
  }

  :disabled {
    border: 2px solid grey;
    background-color: grey;
    opacity: 0.7;
    cursor: default;
  }

  :hover:not(:disabled) {
    background: transparent;
    color: white;
  }
`;

const TextContainer = styled.div`
  position: relative;
`;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonBaseProps {
  loading?: boolean;
}

export const Button = ({ loading, children, ...props }: ButtonProps) => (
  <BaseButton disabled={loading} {...props}>
    <TextContainer>{loading ? <Loading /> : children}</TextContainer>
  </BaseButton>
);
