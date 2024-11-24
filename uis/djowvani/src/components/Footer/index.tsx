import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { ModalContext } from "@/context/modalContext";
import { SoundEffectsContext } from "@/context/soundEffectsContext";
import { useScroll } from "@/hooks/useScroll";
import AnimationModal from "@/components/AnimationModal";
import WebsiteRequestForm from "@/components/WebsiteRequestForm";

import { getScrollYLimit } from "@/utils/scrollUtils";
import {
  thankYouAnimation,
  bearDialogueInAnimation,
  bearDialogueOutAnimation,
} from "@/styles/abstracts/_animations";
import {
  bearDialogueZIndex,
  black2,
  footerColor,
  hoveredLinkColor,
  solidWhite,
} from "@/styles/abstracts/_variables";

const StyledFooter = styled.div<{ isFullyScrolled: boolean }>`
  display: flex;
  position: fixed;
  bottom: 0px;
  flex-direction: column;
  height: 6rem;
  width: 100vw;
  width: 100dvw;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 1s all;

  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  ${({ isFullyScrolled }) =>
    isFullyScrolled
      ? css`
          background-color: ${footerColor};
          box-shadow: 0px -10px 80px 20px ${black2};
        `
      : css`
          background-color: transparent;
          color: transparent;
        `};
`;

const StyledSpan = styled.span<{ isFullyScrolled: boolean }>`
  text-decoration: underline;
  pointer-events: none;
  transition: 0.5s text-shadow;

  &:active {
    color: ${solidWhite};
  }

  &:focus-visible {
    outline: 1px solid ${solidWhite};
  }

  ${({ isFullyScrolled }) =>
    isFullyScrolled &&
    css`
      pointer-events: auto;
      text-shadow: 0px 0px 10px #ffffff;

      &:hover {
        transition: 0.5s color;
        color: ${hoveredLinkColor};
        text-shadow: 0px 0px 10px ${hoveredLinkColor};
      }
    `};
`;

const ThankYou = styled.div<{ visible: boolean }>`
  font-size: 0.8rem;
  margin-top: 1rem;
  visibility: hidden;

  ${({ visible }) =>
    visible &&
    css`
      visibility: visible;
      ${thankYouAnimation}
    `};

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const Bear = styled.span<{ isBearGone: boolean }>`
  &:focus-visible {
    outline: 1px solid ${solidWhite};
  }

  ${({ isBearGone }) =>
    isBearGone &&
    css`
      display: none;
    `};
`;

const BearDialogue = styled.span<{ active: boolean }>`
  position: absolute;
  width: max-content;
  margin-left: 10px;
  z-index: ${bearDialogueZIndex};

  ${({ active }) =>
    active
      ? css`
          ${bearDialogueInAnimation}
        `
      : css`
          ${bearDialogueOutAnimation}
        `};
`;

const Footer = () => {
  const { animationModalVisibility, toggleAnimationModalVisibility } =
    useContext(ModalContext);
  const { soundEffectsObject } = useContext(SoundEffectsContext);
  const { scrollYPosition } = useScroll();

  const [isThanksVisible, setIsThanksVisible] = useState(false);
  const [thankYouSoundLock, setThankYouSoundLock] = useState(false);
  const [bearClicks, setBearClicks] = useState(0);
  const [bearDialogue, setBearDialogue] = useState("");
  const [bearDialogueActive, setBearDialogueActive] = useState(false);
  const [isBearGone, setIsBearGone] = useState(false);

  const isFullyScrolled = scrollYPosition >= getScrollYLimit() - 100;

  const thankYouSound = soundEffectsObject.thankYou;
  const bearLvl0ClickSound = soundEffectsObject.bearLvl0;
  const bearLvl1ClickSound = soundEffectsObject.bearLvl1;
  const bearLvl2ClickSound = soundEffectsObject.bearLvl2;
  const bearLvl3ClickSound = soundEffectsObject.bearLvl3;
  const bearLvl4ClickSound = soundEffectsObject.bearLvl4;
  const bearLvl5ClickSound = soundEffectsObject.bearLvl5;

  const handleBearClick = () => {
    if (bearClicks < 10) {
      bearLvl0ClickSound.play();
      setBearDialogue("~ What's up?");
    } else if (bearClicks <= 25) {
      bearLvl1ClickSound.play();
      setBearDialogue("~ Need something?");
    } else if (bearClicks <= 40) {
      bearLvl2ClickSound.play();
      setBearDialogue("- Why do you keep...stop it...");
    } else if (bearClicks <= 55) {
      bearLvl3ClickSound.play();
      setBearDialogue("- I'm serious");
    } else if (bearClicks < 150) {
      bearLvl4ClickSound.play();
      setBearDialogue("...");
    } else if (bearClicks === 150) {
      bearLvl5ClickSound.play();
      setIsBearGone(true);
    }

    setBearDialogueActive(true);
    setBearClicks((previousValue) => previousValue + 1);
  };

  const handlePlayThankYouSound = () => {
    if (isFullyScrolled) {
      thankYouSound.play();
    }
  };

  useEffect(() => {
    if (isFullyScrolled) {
      setTimeout(() => {
        setIsThanksVisible(true);
        setTimeout(() => {
          if (!thankYouSoundLock) {
            setThankYouSoundLock(true);
            handlePlayThankYouSound();
            setTimeout(() => {
              setBearDialogue("~ Hey!");
              setBearDialogueActive(true);
            }, 2000);
          } else if (bearClicks === 0) {
            setBearDialogue("~ Hey!");
            setBearDialogueActive(true);
          }
        }, 150);
      }, 2000);
    }
  }, [isFullyScrolled]);

  useEffect(() => {
    if (bearDialogueActive) {
      setTimeout(() => {
        setBearDialogueActive(false);
      }, 2000);
    }
  }, [bearDialogueActive]);

  useEffect(() => {
    setTimeout(() => {
      toggleAnimationModalVisibility("false");
    }, 2000);
  }, []);

  return (
    <>
      <StyledFooter id="footer" isFullyScrolled={isFullyScrolled}>
        <span>like what you see?</span>
        <StyledSpan
          tabIndex={0}
          role="button"
          isFullyScrolled={isFullyScrolled}
          onClick={() => toggleAnimationModalVisibility("true")}
          onKeyDown={(event) => {
            if (event.key === "Enter") toggleAnimationModalVisibility("true");
          }}
          aria-label="Open website request modal form"
          aria-controls="website-request-form"
        >
          have your own website like this!
        </StyledSpan>
        <ThankYou visible={isThanksVisible}>
          <span>and thank you for visiting! </span>
          <Bear
            tabIndex={0}
            role="button"
            isBearGone={isBearGone}
            onClick={() => handleBearClick()}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleBearClick();
            }}
          >
            ʕ•ᴥ•ʔ
          </Bear>
          <BearDialogue active={bearDialogueActive}>
            {bearDialogue}
          </BearDialogue>
        </ThankYou>
      </StyledFooter>
      <AnimationModal
        setVisibility={toggleAnimationModalVisibility}
        visibility={animationModalVisibility}
      >
        <WebsiteRequestForm />
      </AnimationModal>
      {/* {forcedLoading && (
        <AnimationModal
          setVisibility={setModalVisibility}
          visibility={modalVisibility}
        >
          <WebsiteRequestForm />
        </AnimationModal>
      )} */}
    </>
  );
};

export default Footer;
