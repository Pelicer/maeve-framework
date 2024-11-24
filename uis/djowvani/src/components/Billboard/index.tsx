import { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";

import { SettingsContext } from "@/context/settingsContext";
import Header from "@/components/Header";

import { backgroundRenderZIndex } from "@/styles/abstracts/_variables";
import { billboardTextsAnimation } from "@/styles/abstracts/_animations";

export const ScrollableId = styled.div<{ discriminator: string }>`
  position: absolute;

  ${({ discriminator }) =>
    discriminator === "about" &&
    css`
      @media screen and (max-width: 1024px) {
        top: 18rem;
      }
    `};
  ${({ discriminator }) =>
    discriminator === "work" &&
    css`
      @media screen and (max-width: 1024px) {
        top: 20rem;
      }
    `};
  ${({ discriminator }) =>
    // Considering Desktop + Vertical WordCloud
    discriminator === "work" &&
    css`
      @media screen and (min-width: 1024px) {
        /* FIX FOR SAFARI */
        position: relative;
        bottom: 56rem;
        /* top: 20rem; */
      }
    `};
  ${({ discriminator }) =>
    discriminator === "contact" &&
    css`
      @media screen and (max-width: 1024px) {
        top: 30rem;
      }
    `};

  /* DEBUG MODE */
  /* background-color: lime;
  width: 2px;
  height: 2px; */
`;

export const Fullscreen = styled.div<{
  centralizeContent: boolean;
  discriminator: string;
}>`
  width: 100%;
  height: 100vh;

  ${({ centralizeContent }) =>
    centralizeContent &&
    css`
      display: flex;
      align-items: center;
    `};

  ${({ discriminator }) =>
    discriminator === "work" &&
    css`
      margin: 20rem 0;
    `};
`;

export const StyledBillboard = styled.div<{
  fullscreen: boolean;
  backgroundParallax: boolean;
  backgroundMediaSource: string;
  isVisible: boolean;
}>`
  display: flex;
  width: 100%;
  padding: 0 7rem;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  font-weight: 900;
  height: ${({ fullscreen }) => fullscreen && "100%"};

  @media screen and (max-width: 1024px) {
    padding: 0;
  }

  ${({ backgroundParallax, backgroundMediaSource }) =>
    backgroundParallax &&
    css`
      z-index: ${backgroundRenderZIndex};
      background-image: url(${backgroundMediaSource});
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `};

  ${({ isVisible }) =>
    isVisible
      ? css`
          ${billboardTextsAnimation};
        `
      : css`
          visibility: hidden;
        `};
`;

interface IBackgroundOptions {
  parallax?: boolean;
  backgroundMediaSource?: string;
}

interface IHeaderOptions {
  hasFading?: boolean;
}

interface IBillboard {
  children?: JSX.Element;
  header?: IHeaderOptions;
  fullscreen?: boolean;
  margin?: boolean;
  centralizeContent?: boolean;
  background?: IBackgroundOptions;
  scrollableId?: number;
  discriminator?: string;
}

const Billboard: React.FC<IBillboard> = ({
  children,
  header,
  fullscreen = false,
  centralizeContent = true,
  background = { parallax: false, backgroundMediaSource: "" },
  scrollableId,
  discriminator,
}) => {
  const { tabNavigationUnlock } = useContext(SettingsContext);
  const [isIntersected, setIsIntersected] = useState(false);

  const isVisible = isIntersected || tabNavigationUnlock;

  const addIntersectionObserverOnScrollTarget = () => {
    const billboardScrollTarget = document.getElementById(
      `scrollTarget-${scrollableId}`
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
        }
      });
    });
    if (billboardScrollTarget) observer.observe(billboardScrollTarget);
  };

  useEffect(() => {
    addIntersectionObserverOnScrollTarget();
  }, [window]);

  return (
    <>
      {header && (
        <Header fullscreenBillboard={fullscreen} hasFading={header.hasFading} />
      )}
      <Fullscreen
        discriminator={discriminator}
        centralizeContent={centralizeContent}
      >
        <StyledBillboard
          fullscreen={fullscreen}
          backgroundParallax={background.parallax}
          backgroundMediaSource={background.backgroundMediaSource}
          isVisible={isVisible}
        >
          {children}
          {scrollableId && (
            <ScrollableId
              id={`scrollTarget-${scrollableId}`}
              discriminator={discriminator}
              scroll-target-id={`scrollTarget-${scrollableId}`}
            />
          )}
        </StyledBillboard>
      </Fullscreen>
    </>
  );
};

export default Billboard;
