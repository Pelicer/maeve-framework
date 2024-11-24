import React, { useContext, useRef } from "react";
import styled, { css } from "styled-components";

import { ModalContext } from "@/context/modalContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import {
  modalZIndex,
  modalBackgroundColor,
} from "@/styles/abstracts/_variables";
import {
  animationModalFadeInAnimation,
  animationModalFadeOutAnimation,
} from "@/styles/abstracts/_animations";

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseModalIcon = styled.span`
  position: relative;
  font-size: 2rem;
  top: 3rem;
  left: 37rem;

  @media screen and (max-width: 1024px) {
    left: 10rem;
  }
`;

const Container = styled.div<{ modalVisibility: boolean }>`
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

  transition: 0.1s all;
  visibility: hidden;

  ${({ modalVisibility }) =>
    modalVisibility
      ? css`
          visibility: visible;
          ${animationModalFadeInAnimation};
        `
      : css`
          visibility: hidden;
          ${animationModalFadeOutAnimation};
        `}
`;

interface IModal {
  modalVisibility: boolean;
}

const Modal: React.FC<IModal> = ({ modalVisibility }) => {
  const ref = useRef(null);
  const { mutateModal, modalContent } = useContext(ModalContext);

  useOnClickOutside(ref, () => mutateModal(modalContent, false));

  return (
    <Container id="modalContainer" modalVisibility={modalVisibility}>
      <CloseModalIcon onClick={() => mutateModal(modalContent, false)}>
        x
      </CloseModalIcon>
      <StyledModal ref={ref}>{modalContent}</StyledModal>
    </Container>
  );
};

export default Modal;
