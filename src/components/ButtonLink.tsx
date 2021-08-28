import { Link } from "gatsby";
import styled from "styled-components";

export const ButtonLink = styled(Link)<{ color: string }>`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
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
  transition: all 0.3s ease;

  :hover {
    background: ${({ color }) => color};
    color: white;
  }
`;
