import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ScrollTargetContext } from "@/context/scrollTargetContext";
import { SoundEffectsContext } from "@/context/soundEffectsContext";

import { scrollIntoTarget } from "utils/scrollUtils";

import {
  scrollDownIndicatorUpAnimation,
  scrollDownIndicatorDownAnimation,
  scrollDownIndicatorScrollButtonAnimation,
  scrollDownIndicatorScrollButtonMobileAnimation,
} from "@/styles/abstracts/_animations";
import {
  solidWhite,
  scrollDownZIndex,
  scrollDownIndicatorColor,
} from "@/styles/abstracts/_variables";

export const StyledScrolldownIndicator = styled.div<{ scrollActive: boolean }>`
  display: flex;
  width: 100%;
  height: 5vh;
  background-color: ${scrollDownIndicatorColor};
  position: fixed;
  bottom: 0;
  z-index: ${scrollDownZIndex};

  ${({ scrollActive }) =>
    scrollActive
      ? scrollDownIndicatorUpAnimation
      : scrollDownIndicatorDownAnimation};
`;

export const StyledScrollButton = styled.div`
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  height: 3rem;
  width: 2rem;
  border: 2px solid white;
  border-radius: 20px;
  outline: none;

  @media screen and (min-width: 1024px) {
    &:before {
      position: absolute;
      margin-top: 8px;
      left: 50%;
      content: "";
      width: 6px;
      height: 6px;
      margin-left: -3px;
      background-color: ${solidWhite};
      border-radius: 100%;
      box-sizing: border-box;

      ${scrollDownIndicatorScrollButtonAnimation};
    }
  }

  @media screen and (max-width: 1024px) {
    &:before {
      position: absolute;
      margin-top: 8px;
      left: 50%;
      content: "";
      width: 6px;
      height: 6px;
      margin-left: -3px;
      background-color: ${solidWhite};
      border-radius: 100%;
      box-sizing: border-box;

      ${scrollDownIndicatorScrollButtonMobileAnimation};
    }
  }
`;

const ScrollDownIndicator: React.FC = () => {
  const MAX_SCROLL_COUNT = 4;
  const { soundEffectsObject } = useContext(SoundEffectsContext);
  const { scrollTarget, setScrollTarget, globalScrollDisable } =
    useContext(ScrollTargetContext);
  const [scrollActive, setScrollActive] = useState(false);
  const [disableScrollingAssistant, setDisableScrollingAssistant] =
    useState(false);

  const scrollSound = soundEffectsObject.scroll;

  const addScrollListenerOnAnimationOpacity = () => {
    window.addEventListener("scroll", () => {
      var BackgroundAnimationContainer, opacity, opacityOffset;

      opacityOffset = 1 - window.scrollY * 0.00075;
      opacity = opacityOffset;

      BackgroundAnimationContainer = document.getElementById(
        "BackgroundAnimationContainer"
      );
      BackgroundAnimationContainer.style.opacity = opacity;
    });
  };

  const addDisablersListeners = () => {
    window.addEventListener("wheel", (event) => {
      setDisableScrollingAssistant(true);
      setScrollActive(false);
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        setDisableScrollingAssistant(true);
        setScrollActive(false);
      }
    });
  };

  const addMouse3Listener = () => {
    window.addEventListener("mousedown", (event) => {
      if (event.button === 1) {
        setDisableScrollingAssistant(true);
        setScrollActive(false);
      }
    });
  };

  const addTouchMoveListener = () => {
    window.addEventListener("touchmove", (event) => {
      setDisableScrollingAssistant(true);
      setScrollActive(false);
    });
  };

  const handleScroll = () => {
    scrollSound.play();
    setScrollActive(false);
    scrollIntoTarget(scrollTarget);
    setScrollTarget(scrollTarget + 1);
  };

  const handleDesktopMouseEnter = (event) => {
    if (event.type === "mouseenter" && event.pageX > 500) {
      handleScroll();
    }
  };

  const handleMobileTap = (event) => {
    handleScroll();
    event.stopPropagation();
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollTarget < MAX_SCROLL_COUNT) {
        setScrollActive(true);
      }
    }, 7000);
  }, [scrollTarget]);

  useEffect(() => {
    setTimeout(() => {
      setScrollActive(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (globalScrollDisable) {
      setDisableScrollingAssistant(true);
      setScrollActive(false);
    }
  }, [globalScrollDisable]);

  addScrollListenerOnAnimationOpacity();
  addDisablersListeners();
  addTouchMoveListener();
  addMouse3Listener();

  return (
    <StyledScrolldownIndicator
      id="scrollDownIndicator"
      scrollActive={scrollActive && !disableScrollingAssistant}
    >
      <StyledScrollButton
        onMouseEnter={handleDesktopMouseEnter}
        onTouchStart={handleMobileTap}
      />
    </StyledScrolldownIndicator>
  );
};

export default ScrollDownIndicator;
