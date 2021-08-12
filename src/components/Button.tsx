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
  padding: 14px 24px;
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

const LoadingContainer = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-100%, -50%);
`;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonBaseProps {
  loading?: boolean;
}

export const Button = ({ loading, children, ...props }: ButtonProps) => (
  <BaseButton disabled={loading} {...props}>
    <TextContainer>
      <LoadingContainer>{loading && <Loading />}</LoadingContainer>
      {children}
    </TextContainer>
  </BaseButton>
);
