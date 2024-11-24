import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

import { scrollToTop } from "@/utils/scrollUtils";

import {
  curtainZIndex,
  black1,
  black2,
  solidWhite,
} from "@/styles/abstracts/_variables";
import {
  curtainAnimation,
  loadingAnimation,
  clickTipAnimation,
  clickTipBackgroundAnimation,
  logoFadeOutAnimation,
} from "@/styles/abstracts/_animations";

export const LogoImage = styled(Image)`
  ${logoFadeOutAnimation};
`;

export const Container = styled.div<{ display: number }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: ${black1};
  z-index: ${curtainZIndex};
  pointer-events: none;
  user-select: none;

  ${curtainAnimation};

  ${({ display }) =>
    !Boolean(display) &&
    css`
      display: none;
    `};
`;

export const Loading = styled.div`
  width: 300px;
  height: 1px;
  margin-top: 2rem;
  background: ${black2};
  ${logoFadeOutAnimation};

  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 1px;
    background: ${solidWhite};

    ${loadingAnimation}
  }
`;

export const ClickTipContainer = styled.div<{ display: number }>`
  display: none;
  position: absolute;

  ${({ display }) =>
    Boolean(display) &&
    css`
      display: block;
      position: absolute;

      ${clickTipAnimation}
    `};

  &::after {
    content: "";
    position: absolute;
    top: 15%;
    left: 5%;
    width: 100px;
    height: 100px;
    background: ${solidWhite};
    border-radius: 50%;

    ${clickTipBackgroundAnimation}
  }
`;

interface ICurtain {
  logo?: boolean;
  children?: JSX.Element;
}

const Curtain: React.FC<ICurtain> = ({ logo = false }) => {
  const [display, setDisplay] = useState(true);
  const [clickTip, setClickTip] = useState(false);

  setTimeout(() => {
    setClickTip(true);
  }, 3000);

  setTimeout(() => {
    setDisplay(false);
  }, 5500);

  useEffect(() => {
    setTimeout(() => {
      scrollToTop();
    }, 4000);
  }, []);

  return (
    <Container display={display ? 1 : 0}>
      {logo && (
        <LogoImage
          priority
          src={"/img/logo.webp"}
          alt={"logo"}
          width={150}
          height={150}
        />
      )}
      <Loading />
      <ClickTipContainer display={clickTip ? 1 : 0}>
        <Image
          priority
          src={"/img/clicktip.webp"}
          alt={"Click to access"}
          width={150}
          height={150}
        />
      </ClickTipContainer>
    </Container>
  );
};

export default Curtain;
