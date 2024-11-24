import { useContext, useRef } from "react";
import styled, { css } from "styled-components";

import { CursorContentContext } from "@/context/cursorContentContext";
import { SoundEffectsContext } from "@/context/soundEffectsContext";
import { SettingsContext } from "@/context/settingsContext";

import Popover from "@/components/Popover";

import { isMobile } from "@/utils/windowUtils";
import { solidBlack, solidWhite } from "@/styles/abstracts/_variables";
import { WordCloudContext } from "@/context/wordCloudContext";

interface IStyledSpan {
  key;
  tag;
  onMouseEnter;
  onMouseLeave;
  onTouchStart;
  color;
  monochrome;
  size;
}

export const StyledSpan = styled.span<IStyledSpan>`
  display: inline-block;
  margin: 0 3px;
  vertical-align: middle;
  font-size: ${({ size }) => size}px;
  font-weight: 400;
  background: transparent;
  transition: 0.25s all;

  ${({ color, monochrome }) =>
    monochrome
      ? css`
          color: ${solidWhite};
          /* text-shadow: 0px 0px 10px #ffffff; */
          font-weight: 200;
        `
      : color === "#000000"
      ? css`
          color: ${color};
          text-shadow: 0px 0px 40px #ffffff;
        `
      : css`
          color: ${color};
          text-shadow: 0px 0px 40px ${color};
        `};

  &:focus-visible,
  &:hover {
    background-color: ${solidWhite};
    color: ${solidBlack};
  }

  @media screen and (max-width: 1024px) {
    font-size: ${({ size }) => size / 1.5}px;
  }
`;

const WordCloudSpan = ({
  tag,
  size,
  color,
  monochrome = false,
  desktopSeparatePopover = false,
}) => {
  const { tabNavigationUnlock } = useContext(SettingsContext);
  const { mutateCursorContent } = useContext(CursorContentContext);
  const { soundEffectsObject } = useContext(SoundEffectsContext);
  const { setFixedPopover, mobilePopoverTag, mutateMobilePopover } =
    useContext(WordCloudContext);
  const spanRef = useRef(null);

  const experienceHoverSound = soundEffectsObject.experienceHover;

  const cursorInteractionHandler = (event) => {
    if (event.type === "mouseenter" && !isMobile()) {
      experienceHoverSound.play();
      if (!desktopSeparatePopover) {
        mutateCursorContent(
          <Popover content={tag} active={true} monochrome={monochrome} />,
          true
        );
      } else {
        setFixedPopover(
          <Popover content={tag} active={true} monochrome={monochrome} />
        );
      }
      return;
    } else if (event.type === "mouseleave") {
      if (!desktopSeparatePopover) {
        mutateCursorContent(
          <Popover content={tag} active={false} monochrome={monochrome} />,
          true
        );
      } else {
        setFixedPopover(
          <Popover content={tag} active={false} monochrome={monochrome} />
        );
      }
      return;
    } else if (event.type === "click" && !isMobile()) {
      event.stopPropagation();
      return;
    } else if (event.type === "focus" && tabNavigationUnlock && !isMobile()) {
      experienceHoverSound.play();
      setFixedPopover(
        <Popover content={tag} active={true} monochrome={monochrome} />
      );
      return;
    } else if (event.type === "blur") {
      setFixedPopover(
        <Popover content={tag} active={false} monochrome={monochrome} />
      );
      return;
    }
  };

  const mobileTapHandler = () => {
    mutateMobilePopover(mobilePopoverTag, false);
    setTimeout(() => {
      mutateMobilePopover(tag, true);
    }, 100);
  };

  return (
    <>
      <StyledSpan
        ref={spanRef}
        tabIndex={0}
        role="tooltip"
        key={tag.value}
        tag={tag}
        onMouseEnter={cursorInteractionHandler}
        onMouseLeave={cursorInteractionHandler}
        onClick={cursorInteractionHandler}
        onKeyDown={cursorInteractionHandler}
        onFocus={cursorInteractionHandler}
        onBlur={cursorInteractionHandler}
        onTouchStart={mobileTapHandler}
        color={color}
        monochrome={monochrome}
        size={size}
        aria-label={`Experience on ${tag.value}`}
        aria-haspopup="dialog"
      >
        {tag.value}
      </StyledSpan>
    </>
  );
};

export default WordCloudSpan;
