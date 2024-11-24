import React, { useRef } from "react";
import styled, { css } from "styled-components";

import { TForceBool } from "@/context/modalContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import {
  modalZIndex,
  modalBackgroundColor,
  solidWhite,
} from "@/styles/abstracts/_variables";
import {
  animationModalFadeInAnimation,
  animationModalFadeOutAnimation,
} from "@/styles/abstracts/_animations";

const Container = styled.div<{ visibility: boolean }>`
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${modalZIndex};
  position: fixed;
  height: 100vh;
  width: 100vw;
  height: 100dvh;
  width: 100dvw;
  background-color: ${modalBackgroundColor};

  ${({ visibility }) =>
    visibility
      ? css`
          ${animationModalFadeInAnimation};
        `
      : css`
          ${animationModalFadeOutAnimation};
        `}
`;

const StyledAnimationModal = styled.div`
  display: flex;
  background: pink;
  align-items: center;
  justify-content: center;
`;

const CloseAnimationModalIcon = styled.span`
  position: relative;
  font-size: 2rem;
  top: 3rem;
  left: 37rem;

  &:focus-visible {
    outline: 1px solid ${solidWhite};
  }

  @media screen and (max-width: 1024px) {
    left: 10rem;
  }
`;

interface IAnimationModal {
  visibility: boolean;
  setVisibility: (forceBool?: TForceBool) => void;
  children: JSX.Element;
}

const AnimationModal: React.FC<IAnimationModal> = ({
  visibility,
  setVisibility,
  children,
}) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => setVisibility("false"));

  const addEventListenerOnTabKeypress = () => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        setVisibility("false");
      }
    });
  };

  addEventListenerOnTabKeypress();

  return (
    <Container id="animationModalContainer" visibility={visibility}>
      <CloseAnimationModalIcon
        tabIndex={0}
        role="button"
        onClick={() => setVisibility("false")}
        onKeyDown={(event) => {
          if (event.key === "Enter") setVisibility("false");
        }}
      >
        x
      </CloseAnimationModalIcon>
      <StyledAnimationModal ref={ref}>{children}</StyledAnimationModal>
    </Container>
  );
};

export default AnimationModal;
