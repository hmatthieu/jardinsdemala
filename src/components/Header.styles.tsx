import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import { MAX_WIDTH_CONTENT } from "../constant/Sizes";

export const Container = styled.header`
  width: 100%;
  max-width: ${MAX_WIDTH_CONTENT}px;
  margin: auto;
  padding: 0 42px;
  height: 200px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export const Link = styled(GatsbyLink)`
  position: relative;
  margin: 0 24px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 108%;
    width: 0%;
    height: 3px;
    border-radius: 5px;
    transition: all 300ms ease;
    background-color: black;
    opacity: 0;
  }

  &.active::after,
  &:hover::after {
    width: 90%;
    opacity: 1;
  }
`;

export const Logo = styled.img`
  min-height: 180px;
  height: 180px;
  min-width: 180px;
  width: 180px;
`;
