import { useContext, useEffect, useLayoutEffect, useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

import { SettingsContext } from "@/context/settingsContext";
import { SoundEffectsContext } from "@/context/soundEffectsContext";
import { ScrollTargetContext } from "@/context/scrollTargetContext";
import { BackgroundAnimationContext } from "@/context/backgroundAnimationContext";

import { useScroll } from "@/hooks/useScroll";

import { scrollIntoTarget } from "utils/scrollUtils";
import { isMobile } from "@/utils/windowUtils";

import { headerOptions } from "@/data/index";

import {
  headerZIndex,
  black1,
  black2,
  solidWhite,
  solidBlack,
} from "@/styles/abstracts/_variables";
import {
  headerAnimation,
  desktopRequiredTooltipFadeInAnimation,
  desktopRequiredTooltipFadeOutAnimation,
} from "@/styles/abstracts/_animations";

export const LogoContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;

  &:focus-visible {
    outline: 1px solid ${solidWhite};
  }
`;

export const Logo = styled(Image)<{
  is_zero_scrolled: number;
  tabNavigationUnlock: number;
}>`
  user-select: none;
  pointer-events: none;

  transition: 5s all;

  ${({ is_zero_scrolled }) =>
    Boolean(is_zero_scrolled)
      ? css`
          filter: invert(1);
          &:focus-visible {
            outline: 1px solid black;
          }
        `
      : css`
          &:focus-visible {
            outline: 1px solid ${solidWhite};
          }
        `};

  :hover {
    filter: invert(1);
  }
`;

export const SectionsContainer = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-left: 1rem;
    border-bottom: 1px solid transparent;
    transition: all 0.4s cubic-bezier(0, 0.55, 0.45, 1);

    &:hover {
      text-shadow: none;
      border-bottom: 1px solid ${solidWhite};
    }
  }
`;

export const HeaderOption = styled.span`
  &:focus-visible {
    outline: 1px solid ${solidWhite};
  }
`;

export const CameraPosition = styled.div<{ activeCamera: number }>`
  height: 25px;
  width: 25px;
  background-image: url("/img/cameraPosition0.webp");
  background-position: center;
  background-size: contain;
  transition: 0.5s;

  &:hover {
    filter: drop-shadow(0px 0px 10px ${solidWhite}) invert(0.25);
  }

  &:focus-visible {
    transition: 0s;
    outline: 1px solid ${solidWhite};
    filter: drop-shadow(0px 0px 10px ${solidBlack}) invert(1);
  }

  ${({ activeCamera }) => {
    switch (activeCamera) {
      case 0:
        return css`
          background-image: url("/img/cameraPosition0.webp");
        `;
      case 1:
        return css`
          background-image: url("/img/cameraPosition1.webp");
        `;
      case 2:
        return css`
          background-image: url("/img/cameraPosition2.webp");
        `;
      case 3:
        return css`
          background-image: url("/img/cameraPosition3.webp");
        `;
      case 4:
        return css`
          background-image: url("/img/cameraPosition4.webp");
        `;
      default:
        break;
    }
  }}
`;

export const SettingsContainer = styled.div`
  display: flex;
  position: relative;
  width: 7rem;
  right: 2rem;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    margin-left: 30px;
  }
`;

export const SettingsToggle = styled(Image)<{ active: number }>`
  transition: 0.5s;

  &:hover {
    filter: drop-shadow(0px 0px 10px ${solidWhite}) invert(0.25);
  }

  &:focus-visible {
    transition: 0s;
    outline: 1px solid ${solidWhite};
    filter: drop-shadow(0px 0px 10px ${solidBlack}) invert(1);
  }

  ${({ active }) =>
    Boolean(active)
      ? css`
          filter: invert(1);
          &:focus-visible {
            outline: 1px solid ${solidBlack};
          }
          &:hover {
            filter: drop-shadow(0px 0px 10px ${solidBlack}) invert(1);
          }
        `
      : css`
          &:focus-visible {
            outline: 1px solid ${solidWhite};
          }
        `};
`;

export const SettingsToggleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderContainer = styled.div<{
  fullscreenBillboard: boolean;
  hasFading: boolean;
  is_zero_scrolled: number;
}>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 8vh;
  width: 100vw;
  font-size: 1rem;
  font-weight: 900;
  user-select: none;

  transition: 1s all;

  ${headerAnimation}

  ${({ is_zero_scrolled, hasFading }) =>
    Boolean(is_zero_scrolled) && hasFading
      ? css`
          background-color: transparent;
        `
      : css`
          background-color: ${black1};
          box-shadow: 0px -10px 80px 20px ${black2};
        `};

  ${({ fullscreenBillboard }) =>
    fullscreenBillboard &&
    css`
      position: absolute;
      z-index: ${headerZIndex};
    `};

  ${({ hasFading }) =>
    hasFading &&
    css`
      position: fixed;
      opacity: 0.1;
    `};
`;

export const DesktopRequiredTooltip = styled.div<{
  isVisibleDesktopRequiredTooltip: boolean;
}>`
  position: absolute;
  bottom: -30px;
  width: 100px;
  text-align: center;

  ${({ isVisibleDesktopRequiredTooltip }) =>
    isVisibleDesktopRequiredTooltip
      ? css`
          ${desktopRequiredTooltipFadeInAnimation};
        `
      : css`
          ${desktopRequiredTooltipFadeOutAnimation};
        `}
`;

interface IHeader {
  fullscreenBillboard: boolean;
  hasFading: boolean;
}

const Header: React.FC<IHeader> = ({
  fullscreenBillboard = false,
  hasFading = false,
}) => {
  const {
    setEffectsEnabled,
    effectsVisibility,
    setEffectsVisibility,
    soundsEnabled,
    setSoundsEnabled,
    tabNavigationUnlock,
    setTabNavigationUnlock,
  } = useContext(SettingsContext);
  const { soundEffectsObject } = useContext(SoundEffectsContext);
  const { setGlobalScrollDisable } = useContext(ScrollTargetContext);
  const { changeCameraPosition, activeCamera } = useContext(
    BackgroundAnimationContext
  );
  const { scrollYPosition } = useScroll();
  const [isEffectsRenderLock, setIsEffectsRenderLock] = useState(false);
  const [isVisibleDesktopRequiredTooltip, setIsVisibleDesktopRequiredTooltip] =
    useState(false);

  const is_zero_scrolled = scrollYPosition === 0;

  const optionHoverSound = soundEffectsObject.headerOptionHover;
  const scrollSound = soundEffectsObject.scroll;

  const addEventListenerOnTabKeypress = () => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Tab") {
        setTabNavigationUnlock(true);
      }
    });
  };

  const handleChangeCamera = () => {
    scrollIntoTarget("1");
    soundEffectsObject.changeCamera.play();
    changeCameraPosition();
  };

  const handleEffectsToggle = (value: boolean) => {
    var backgroundSmoke = document.getElementById("backgroundSmoke");
    var backgroundSmokeTint = document.getElementById("backgroundSmokeTint");
    var backgroundSmokeContainer = document.getElementById(
      "backgroundSmokeContainer"
    );

    if (isEffectsRenderLock !== true) {
      setEffectsEnabled(true);
      setEffectsVisibility(true);
      setIsEffectsRenderLock(true);
    }
    if (value) {
      setEffectsVisibility(true);
      backgroundSmoke?.classList.add("backgroundSmokeVisibilityOn");
      backgroundSmokeTint?.classList.add("backgroundSmokeVisibilityOn");
      backgroundSmokeContainer?.classList.add("backgroundSmokeVisibilityOn");
      backgroundSmoke?.classList.add("backgroundSmokeVisibilityOn");

      backgroundSmoke?.classList.remove("backgroundSmokeVisibilityOff");
      backgroundSmokeTint?.classList.remove("backgroundSmokeVisibilityOff");
      backgroundSmoke?.classList.remove("backgroundSmokeVisibilityOff");
      backgroundSmokeContainer?.classList.remove(
        "backgroundSmokeVisibilityOff"
      );
    } else {
      setEffectsVisibility(false);
      backgroundSmoke?.classList.remove("backgroundSmokeVisibilityOn");
      backgroundSmokeTint?.classList.remove("backgroundSmokeVisibilityOn");
      backgroundSmokeContainer?.classList.remove("backgroundSmokeVisibilityOn");
      backgroundSmoke?.classList.remove("backgroundSmokeVisibilityOn");

      backgroundSmoke?.classList.add("backgroundSmokeVisibilityOff");
      backgroundSmokeTint?.classList.add("backgroundSmokeVisibilityOff");
      backgroundSmokeContainer?.classList.add("backgroundSmokeVisibilityOff");
      backgroundSmoke?.classList.add("backgroundSmokeVisibilityOff");
    }
  };

  const handleScrollIntoTarget = (target: string) => {
    scrollSound.play();
    setGlobalScrollDisable(true);
    scrollIntoTarget(target);
  };

  useEffect(() => {
    if (isVisibleDesktopRequiredTooltip) {
      setTimeout(() => {
        setIsVisibleDesktopRequiredTooltip(false);
      }, 2000);
    }
  }, [isVisibleDesktopRequiredTooltip]);

  useEffect(() => {
    addEventListenerOnTabKeypress();
  }, []);

  return (
    <HeaderContainer
      id="header"
      fullscreenBillboard={fullscreenBillboard}
      hasFading={hasFading}
      is_zero_scrolled={is_zero_scrolled ? 1 : 0}
    >
      <LogoContainer
        onClick={() => handleScrollIntoTarget("1")}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleScrollIntoTarget("1");
        }}
        aria-label="Go to main section, at the top of the page"
        role="button"
      >
        <Logo
          src={"/img/logo.webp"}
          width={40}
          height={40}
          alt={"logo"}
          is_zero_scrolled={is_zero_scrolled ? 1 : 0}
          tabNavigationUnlock={tabNavigationUnlock ? 1 : 0}
        />
      </LogoContainer>
      <SectionsContainer>
        <SettingsContainer>
          <CameraPosition
            tabIndex={0}
            role="button"
            onClick={() => handleChangeCamera()}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleChangeCamera();
            }}
            activeCamera={activeCamera}
            aria-label="Change camera position for background animation"
          />
          <SettingsToggleContainer>
            {isMobile() ? (
              <>
                <SettingsToggle
                  tabIndex={0}
                  role="button"
                  onClick={() => setIsVisibleDesktopRequiredTooltip(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter")
                      setIsVisibleDesktopRequiredTooltip(true);
                  }}
                  src={"/img/effectsOn.webp"}
                  width={25}
                  height={25}
                  alt={"effectsToggle"}
                  active={0}
                  aria-label="Toggle an extra visual effect on screen, a smoke fluid simulation upon cursor movement"
                />
                <DesktopRequiredTooltip
                  isVisibleDesktopRequiredTooltip={
                    isVisibleDesktopRequiredTooltip
                  }
                >
                  desktop-only feature
                </DesktopRequiredTooltip>
              </>
            ) : (
              <SettingsToggle
                tabIndex={0}
                role="button"
                onClick={() => handleEffectsToggle(!effectsVisibility)}
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    handleEffectsToggle(!effectsVisibility);
                }}
                src={"/img/effectsOn.webp"}
                width={25}
                height={25}
                alt={"effectsToggle"}
                active={effectsVisibility ? 1 : 0}
                aria-label="Toggle an extra visual effect on screen, a smoke fluid simulation upon cursor movement"
              />
            )}
          </SettingsToggleContainer>
          <SettingsToggle
            tabIndex={0}
            role="button"
            onClick={() => setSoundsEnabled(!soundsEnabled)}
            onKeyDown={(event) => {
              if (event.key === "Enter") setSoundsEnabled(!soundsEnabled);
            }}
            src={"/img/soundOn.webp"}
            width={25}
            height={25}
            alt={"soundsToggle"}
            active={soundsEnabled ? 1 : 0}
            aria-label="Toggle audio effects for screen elements cursor interaction"
          />
        </SettingsContainer>
        {headerOptions.map((option) => (
          <HeaderOption
            tabIndex={0}
            role="button"
            key={option.name}
            onClick={() => handleScrollIntoTarget(option.scrollTarget)}
            onKeyDown={(event) => {
              if (event.key === "Enter")
                handleScrollIntoTarget(option.scrollTarget);
            }}
            onMouseEnter={() => optionHoverSound.play()}
            aria-label={option.aria}
          >
            {option.name}
          </HeaderOption>
        ))}
      </SectionsContainer>
    </HeaderContainer>
  );
};

export default Header;
