import * as React from "react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { PURPLE } from "../constant/Colors";

const Container = styled.div``;

const BannerImageContainer = styled.div`
  position: relative;
  height: 60vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerImage = styled.img<{ lowSrc?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  ${({ lowSrc }) =>
    lowSrc &&
    `
    background-image: url(${lowSrc});
  `}
`;

const CaptionContainer = styled.div`
  background-color: ${PURPLE};
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Caption = styled.q`
  font-size: 36px;
  font-weight: 700;
  color: white;
  ::after,
  ::before {
    content: "";
  }
`;

const CTA = styled.a<{ visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  min-width: 650px;
  padding: 24px 48px;
  color: ${PURPLE};
  text-transform: uppercase;
  font-size: 28px;
  font-weight: 700;
  transition: opacity 1s ease, transform 1s ease, background 0.3s ease;

  ${({ visible }) =>
      visible
        ? `
    opacity: 1;
    transform: translateY(0);
  `
        : `
    opacity: 0;
    transform: translateY(-20%);
  `}
    :hover {
    background-color: white;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  }

  img {
    height: 120px;
    min-height: 120px;
    width: 120px;
    min-width: 120px;
    object-fit: contain;
    margin-bottom: 24px;
  }
`;

interface Props {
  imageURL: string;
  lowImageURL?: string;
  caption: string;
  cta?: {
    text: string;
    imageURL: string;
    imageAlt: string;
    link: string;
  };
}

export const Banner = ({ imageURL, lowImageURL, caption, cta }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleImageLoaded = useCallback(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, [setVisible]);

  return (
    <Container>
      <BannerImageContainer>
        <BannerImage
          lowSrc={lowImageURL}
          src={imageURL}
          loading="lazy"
          onLoad={handleImageLoaded}
        />
        {cta && (
          <CTA visible={visible} href={cta.link}>
            <img src={cta.imageURL} alt={cta.imageAlt} />
            <h1>Je réserve ma chambre</h1>
          </CTA>
        )}
      </BannerImageContainer>
      <CaptionContainer>
        <Caption>{caption}</Caption>
      </CaptionContainer>
    </Container>
  );
};
