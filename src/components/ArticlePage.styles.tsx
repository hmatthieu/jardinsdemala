import styled from "styled-components";
import { Link } from "gatsby";
import { TABLET } from "../constant/Breakpoints";

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;

  > *:not(:first-child) {
    margin-left: 12px;
  }
`;

export const Tag = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  height: 39px;
  font-weight: bold;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  text-transform: uppercase;
  padding: 8px 16px;
  background-color: transparent;
  border: 2px solid ${({ color }) => color};
  color: ${({ color }) => color};
`;

export const Share = styled.a`
  cursor: pointer;
  display: inline-block;
  height: 39px;
  width: 39px;
  transition: all 0.3s ease;
  border: 3px solid ${({ color }) => color};
  background-color: white;
  color: ${({ color }) => color};

  :hover {
    background-color: ${({ color }) => color};
    color: white;
  }

  > svg {
    margin: -1px;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  margin-top: 48px;
  margin-bottom: 24px;
  font-weight: bold;
`;

export const LinkedArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 48px 0;
`;

export const LinkedArticlesList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const LinkedArticle = styled(Link)<{ color: string }>`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  text-transform: uppercase;
  padding: 8px 16px;
  border: 2px solid ${({ color }) => color};
  background: ${({ color }) => color};
  color: white;
  transition: all 0.3s ease;
  margin: 12px;

  :hover {
    background-color: transparent;
    color: ${({ color }) => color};
  }

  @media (max-width: ${TABLET}px) {
    width: 100%;
  }
`;

export const Discover = styled.p<{ color: string }>`
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ color }) => color};
  border-bottom: 2px solid ${({ color }) => color};
`;
