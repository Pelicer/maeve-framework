import { useContext } from "react";
import styled, { css } from "styled-components";

import { SoundEffectsContext } from "@/context/soundEffectsContext";
import { WordCloudContext } from "@/context/wordCloudContext";

import {
  mobileWordCloudToggleOptionLeftToRightAnimation,
  mobileWordCloudToggleOptionRightToLeftAnimation,
  wordCloudToggleOptionLeftToRightAnimation,
  wordCloudToggleOptionRightToLeftAnimation,
} from "@/styles/abstracts/_animations";
import {
  solidWhite,
  grayDark1,
  backgroundWordCloudFilterSelectedOption,
} from "@/styles/abstracts/_variables";

const WordCloudToggleOptionContainer = styled.button<{ onOff: boolean }>`
  --selected-option-width: 15rem;

  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-around;
  height: 1.5rem;
  width: var(--selected-option-width);
  margin: 2rem 0;
  border: 1px solid ${solidWhite};
  user-select: none;
  background: transparent;
  color: ${solidWhite};

  &::after {
    content: "";
    position: absolute;
    z-index: ${backgroundWordCloudFilterSelectedOption};
    height: 1.5rem;
    width: calc(var(--selected-option-width) / 2);
    background: ${grayDark1};

    ${({ onOff }) =>
      onOff
        ? css`
            ${wordCloudToggleOptionRightToLeftAnimation};
          `
        : css`
            ${wordCloudToggleOptionLeftToRightAnimation};
          `}
  }

  @media screen and (max-width: 1024px) {
    &::after {
      content: "";
      position: absolute;
      z-index: ${backgroundWordCloudFilterSelectedOption};
      height: 1.5rem;
      width: calc(var(--selected-option-width) / 2);
      background: ${grayDark1};

      ${({ onOff }) =>
        onOff
          ? css`
              ${mobileWordCloudToggleOptionRightToLeftAnimation};
            `
          : css`
              ${mobileWordCloudToggleOptionLeftToRightAnimation};
            `}
    }
  }
`;

const WordCloudToggleOption = styled.div``;

const WordCloudFilter: React.FC = () => {
  const { soundEffectsObject } = useContext(SoundEffectsContext);
  const { showOnlyMainSkillsState, setShowOnlyMainSkillsState } =
    useContext(WordCloudContext);
  const filterChangeSound = soundEffectsObject.filterChange;

  const handleOnClickToggle = () => {
    const elementClassList =
      document.getElementById("wordCloudComponent").classList;

    elementClassList.remove("animatingOut");
    elementClassList.add("animatingIn");

    setTimeout(() => {
      filterChangeSound.play();
      setShowOnlyMainSkillsState((previousValue) => !previousValue);
    }, 100);

    setTimeout(() => {
      elementClassList.remove("animatingIn");
      elementClassList.add("animatingOut");
    }, 250);
  };

  return (
    <WordCloudToggleOptionContainer
      tabIndex={0}
      aria-label="Toggle word cloud mode"
      aria-pressed={`${showOnlyMainSkillsState}`}
      onOff={showOnlyMainSkillsState}
      onClick={handleOnClickToggle}
    >
      <WordCloudToggleOption id="mainSkills">main skills</WordCloudToggleOption>
      <WordCloudToggleOption id="allSkills">all skills</WordCloudToggleOption>
    </WordCloudToggleOptionContainer>
  );
};

export default WordCloudFilter;
