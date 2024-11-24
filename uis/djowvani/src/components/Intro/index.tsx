import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import {
  susUnderscoreFlickerAnimation,
  shakingPromptAnimation,
} from "@/styles/abstracts/_animations";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  text-align: end;
  font-weight: 900;

  @media screen and (max-width: 1024px) {
    text-align: center;
    margin-right: 10px;
  }
`;

const TitleContainer = styled.div<{ shaking: boolean }>`
  display: flex;
  font-size: 3rem;

  & span {
    user-select: none;
    pointer-events: none;
  }

  ${({ shaking }) =>
    shaking &&
    css`
      ${shakingPromptAnimation}
    `}
`;

const Occupation = styled.span`
  font-size: 1rem;
  pointer-events: none;
  user-select: none;
`;

const SusUnderscore = styled.div<{ active: boolean }>`
  width: 30px;

  &::after {
    content: "_";
    position: absolute;
    margin-left: -27px;
  }

  ${({ active }) =>
    active &&
    css`
      ${susUnderscoreFlickerAnimation}
    `}
`;

const Intro = () => {
  const [susUnderscoreActive, setSusUnderscoreActive] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [unlockedPrompt, setUnlockedPrompt] = useState(false);

  const promptRef = useRef(null);

  const handleClickSusUnderscore = () => {
    setSusUnderscoreActive(true);
  };
  const handleCursorLeaveSusUnderscore = () => {
    setSusUnderscoreActive(false);
  };
  const handleKeyDown = (event) => {
    if (susUnderscoreActive && backspaceCount <= 10) {
      if (event.key === "Backspace") {
        setBackspaceCount((previousValue) => previousValue + 1);
        setIsShaking(true);
      }
    }
  };

  useEffect(() => {
    if (backspaceCount > 10) {
      setUnlockedPrompt(true);
    }
  }, [backspaceCount]);

  useEffect(() => {
    if (isShaking) {
      setTimeout(() => {
        setIsShaking(false);
      }, 250);
    }
  }, [isShaking]);

  useEffect(() => {
    if (unlockedPrompt) {
      promptRef.current.focus();
    }
  }, [unlockedPrompt]);

  return (
    <Container tabIndex={0} role="group">
      {unlockedPrompt ? (
        <></>
      ) : (
        <>
          <TitleContainer shaking={isShaking}>
            <span>Djow.dev</span>
            <SusUnderscore
              id="susUnderscore"
              tabIndex={0}
              active={susUnderscoreActive}
              onClick={handleClickSusUnderscore}
              onMouseLeave={handleCursorLeaveSusUnderscore}
              onKeyDown={handleKeyDown}
            />
          </TitleContainer>
          <Occupation>Software Engineer</Occupation>
        </>
      )}
    </Container>
  );
};

export default Intro;
