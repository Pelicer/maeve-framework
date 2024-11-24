import { useContext } from "react";
import styled from "styled-components";
import { TagCloud } from "react-tagcloud";

import { WordCloudContext } from "@/context/wordCloudContext";
import WordCloudSpan from "@/components/WordCloudSpan";

import {
  wordCloudSpanFadeInAnimation,
  wordCloudSpanFadeOutAnimation,
} from "@/styles/abstracts/_animations";

const StyledWordCloud = styled(TagCloud)<{ visibleExperiences: any }>`
  align-items: center;
  text-align: center;
  width: 75%;

  &.animatingIn {
    ${wordCloudSpanFadeOutAnimation}
  }
  &.animatingOut {
    ${wordCloudSpanFadeInAnimation}
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

interface IWordCloudComponent {
  monochrome: boolean;
  desktopSeparatePopover: boolean;
}

const WordCloudComponent: React.FC<IWordCloudComponent> = ({
  monochrome,
  desktopSeparatePopover,
}) => {
  const { visibleExperiences } = useContext(WordCloudContext);

  const customSpanRenderer = (tag, count, color) => {
    return (
      <WordCloudSpan
        key={tag.value}
        tag={tag}
        size={count}
        color={color}
        monochrome={monochrome}
        desktopSeparatePopover={desktopSeparatePopover}
      />
    );
  };

  return (
    <StyledWordCloud
      id="wordCloudComponent"
      minSize={15}
      maxSize={40}
      tags={visibleExperiences}
      renderer={customSpanRenderer}
    />
  );
};

export default WordCloudComponent;
