import { useContext } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

import { PopoverZIndex } from "@/styles/abstracts/_variables";
import {
  popoverFadeInAnimation,
  popoverFadeOutAnimation,
} from "@/styles/abstracts/_animations";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { WordCloudContext } from "@/context/wordCloudContext";

export const Container = styled.div<{ active; monochrome }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 20rem;

  visibility: ${({ active }) => active};
  ${({ active }) =>
    active ? popoverFadeInAnimation : popoverFadeOutAnimation};

  @media screen and (min-width: 1024px) {
    display: none;
  }

  &:after {
    content: "";
    z-index: ${PopoverZIndex};
    position: absolute;
    width: 120%;
    height: 225px;
    background-size: 1100px;
    background: ${(props) =>
      `linear-gradient(90deg, transparent, ${props.color}, transparent)`};
  }

  ${({ monochrome }) =>
    monochrome &&
    css`
      &:after {
        content: "";
        z-index: ${PopoverZIndex};
        position: absolute;
        height: 225px;
        background-size: 1100px;
        background: linear-gradient(90deg, transparent, white, transparent);
      }
    `};
`;

export const ImageContainer = styled.div<{ monochrome }>`
  position: absolute;
  filter: brightness(0) invert(1);
  opacity: 0.25;

  ${({ monochrome }) =>
    monochrome
      ? css``
      : css`
          filter: brightness(100) invert(1);
          /* filter: brightness(0) invert(1); */ // white color overlay
        `};
`;

export const Content = styled.div<{ monochrome }>`
  height: 100%;
  width: 25rem;

  h1 {
    margin-bottom: 1rem;
  }

  ${({ monochrome }) =>
    monochrome &&
    css`
      h1,
      p {
        font-weight: 500;
        color: black;
      }
    `}
`;

interface IMobilePopover {
  fadeAwayReference: React.MutableRefObject<any>;
  monochrome: boolean;
}

const MobilePopover: React.FC<IMobilePopover> = ({
  fadeAwayReference,
  monochrome,
}) => {
  const { mobilePopoverTag, mobilePopoverVisibility, mutateMobilePopover } =
    useContext(WordCloudContext);

  const handleFadeAway = () => {
    mutateMobilePopover(mobilePopoverTag, false);
  };

  useOnClickOutside(fadeAwayReference, () => handleFadeAway());

  return (
    <Container
      id="popover-frame"
      color={mobilePopoverTag.color}
      active={mobilePopoverVisibility}
      monochrome={monochrome}
    >
      <ImageContainer monochrome={monochrome}>
        {mobilePopoverVisibility && (
          <Image
            src={`${mobilePopoverTag.icon}`}
            alt={`${mobilePopoverTag.value} icon`}
            width={170}
            height={170}
          />
        )}
      </ImageContainer>
      <Content monochrome={monochrome}>
        <h1
          id={`experience-on-${mobilePopoverTag.value}`}
          aria-label={mobilePopoverTag.value}
          aria-describedby={`experience-on-${mobilePopoverTag.value}-description`}
        >
          {mobilePopoverTag.value}
        </h1>
        <p
          id={`experience-on-${mobilePopoverTag.value}-description`}
          aria-label={`${mobilePopoverTag.value} description`}
          aria-labelledby={`experience-on-${mobilePopoverTag.value}`}
        >
          {mobilePopoverTag.description}
        </p>
      </Content>
    </Container>
  );
};

export default MobilePopover;
