import { MutableRefObject } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

import {
  popoverFadeInAnimation,
  popoverFadeOutAnimation,
} from "@/styles/abstracts/_animations";
import {
  PopoverZIndex,
  PopoverContentLogoZIndex,
} from "@/styles/abstracts/_variables";

interface IContainer {
  active: boolean;
  refElement: null | MutableRefObject<any>;
  color: string;
  monochrome: boolean;
}
export const Container = styled.div<IContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${({ refElement }) =>
    refElement &&
    css`
      position: fixed;
      pointer-events: none;
    `}

  ${({ refElement, active }) =>
    refElement &&
    !active &&
    css`
      display: none;
    `}

  ${({ active }) =>
    active ? popoverFadeInAnimation : popoverFadeOutAnimation};

  ${({ monochrome, color }) =>
    monochrome
      ? css`
          &:after {
            content: "";
            z-index: ${PopoverZIndex};
            position: absolute;
            width: 700px;
            height: 225px;
            transform: skew(-20deg);
            background-size: 1100px;
            background: linear-gradient(90deg, transparent, white, transparent);
          }
        `
      : css`
          &:after {
            content: "";
            z-index: ${PopoverZIndex};
            position: absolute;
            width: 700px;
            height: 225px;
            transform: skew(-20deg);
            background-size: 1100px;
            background: ${(color) =>
              `linear-gradient(90deg, transparent, ${color}, transparent)`};
          }
        `};
`;

interface IImageContainer {
  monochrome: boolean;
}
export const ImageContainer = styled.div<IImageContainer>`
  position: absolute;
  z-index: ${PopoverContentLogoZIndex};
  opacity: 0.25;

  ${({ monochrome }) =>
    monochrome
      ? css``
      : css`
          filter: brightness(100) invert(1);
        `};
`;

interface IContent {
  blackText: boolean;
  monochrome: boolean;
}
export const Content = styled.div<IContent>`
  height: 100%;
  width: 25rem;

  h1 {
    margin-bottom: 1rem;
  }

  ${({ blackText, monochrome }) =>
    blackText && !monochrome
      ? css`
          h1,
          p {
            color: black;
            font-weight: 500;
            /* background-blend-mode: difference; */
            /* mix-blend-mode: exclusion; */
          }
        `
      : css`
          h1,
          p {
            font-weight: 500;
            color: black;
          }
        `}
`;

const Popover = ({
  content,
  active,
  refElement = null,
  monochrome = false,
}) => {
  return (
    <Container
      id="popover-frame"
      color={content.color}
      active={active}
      refElement={refElement}
      monochrome={monochrome}
    >
      <ImageContainer monochrome={monochrome}>
        <Image
          src={`${content.icon}`}
          alt={`${content.value} icon`}
          width={170}
          height={170}
        />
      </ImageContainer>
      <Content blackText={content.blackText} monochrome={monochrome}>
        <h1
          id={`experience-on-${content.value}`}
          aria-label={content.value}
          aria-describedby={`experience-on-${content.value}-description`}
        >
          {content.value}
        </h1>
        <p
          id={`experience-on-${content.value}-description`}
          aria-label={`${content.value} description`}
          aria-labelledby={`experience-on-${content.value}`}
        >
          {content.description}
        </p>
      </Content>
    </Container>
  );
};

export default Popover;
