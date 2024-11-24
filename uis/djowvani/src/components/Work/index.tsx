import styled, { css } from "styled-components";

import CategorySelector from "@/components/CategorySelector";
import WordCloud from "@/components/WordCloud";

const WorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  & > h1 {
    pointer-events: none;
    user-select: none;
  }

  & > div {
    margin-top: 2rem;
  }
`;

const WorkContent = styled.div<{ vertical: boolean }>`
  ${({ vertical }) =>
    Boolean(vertical)
      ? css`
          display: flex;
          height: 100%;
          width: 100%;
          min-height: 40rem;
          align-items: center;
          flex-direction: column;
        `
      : css`
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
        `};

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Experiences = styled.div<{ vertical: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: baseline;
  height: 100%;
  width: 50%;

  & > :not(:first-child) {
    margin-top: 3rem;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0 2rem;
    min-height: 600px;
  }

  ${({ vertical }) =>
    Boolean(vertical) &&
    css`
      display: flex;
      height: 100%;
      width: 100%;
      min-height: 35rem;
      padding: 0 10%;
    `};
`;

const VisualizationContainer = styled.div<{ vertical: boolean }>`
  width: 50%;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 2rem 2rem;
  }

  ${({ vertical }) =>
    Boolean(vertical) &&
    css`
      height: 100%;
      width: 100%;
      margin-top: 1rem;
    `};
`;

interface IWork {
  wordCloud?: { vertical?: boolean; desktopSeparatePopover?: boolean };
  monochrome?: boolean;
}

const Work: React.FC<IWork> = ({
  wordCloud = { vertical: false, desktopSeparatePopover: false },
  monochrome = false,
}) => {
  const { vertical, desktopSeparatePopover } = wordCloud;

  return (
    <WorkContainer tabIndex={0} role="group">
      <h1>Work & Experience</h1>
      <WorkContent vertical={vertical}>
        <Experiences
          id="tabpanel-experiences"
          role="tabpanel"
          aria-live="polite"
          vertical={vertical}
        >
          <CategorySelector
            aria-label="knowledge-experiences-category-selector"
            aria-controls="knowledge-experiences"
            aria-owns="tab-education tab-jobs tab-personal"
          />
        </Experiences>

        <VisualizationContainer vertical={vertical}>
          {wordCloud && (
            <WordCloud
              vertical={vertical}
              desktopSeparatePopover={desktopSeparatePopover}
              monochrome={monochrome}
            />
          )}
        </VisualizationContainer>
      </WorkContent>
    </WorkContainer>
  );
};

export default Work;
