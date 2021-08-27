import styled from "styled-components";
import { Link } from "gatsby";
import { ORANGE } from "../constant/Colors";
import { TABLET } from "../constant/Breakpoints";

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;

  > *:not(:first-child) {
    margin-left: 12px;
  }
`;

export const TagLink = styled(Link)``;

export const Tag = styled.span`
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
  border: 2px solid ${ORANGE};
  color: ${ORANGE};
  transition: all 0.3s ease;

  ${TagLink}:hover & {
    background: ${ORANGE};
    color: white;
  }
`;

export const Share = styled.a`
  cursor: pointer;
  display: inline-block;
  height: 39px;
  width: 39px;
  transform: scale(1);
  transition: all 0.3s ease;
  :hover {
    transform: scale(1.1);
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

export const LinkedArticle = styled(Link)`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  text-transform: uppercase;
  padding: 8px 16px;
  border: 2px solid ${ORANGE};
  background: ${ORANGE};
  color: white;
  transition: all 0.3s ease;
  margin: 12px;

  :hover {
    background-color: transparent;
    color: ${ORANGE};
  }

  @media (max-width: ${TABLET}px) {
    width: 100%;
  }
`;

export const Discover = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${ORANGE};
  border-bottom: 2px solid ${ORANGE};
`;
