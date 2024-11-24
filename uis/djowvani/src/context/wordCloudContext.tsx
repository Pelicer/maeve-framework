import React, { createContext, useMemo, useState } from "react";

import { defaultWordCloudFilterSettings, experience } from "../data";

type TWordCloudContext = {
  fixedPopover: React.JSX.Element;
  setFixedPopover: React.Dispatch<React.SetStateAction<React.JSX.Element>>;
  visibleExperiences: any[];
  showOnlyMainSkillsState: boolean;
  setShowOnlyMainSkillsState: React.Dispatch<React.SetStateAction<boolean>>;
  mobilePopoverTag: any;
  mobilePopoverVisibility: boolean;
  mutateMobilePopover: (tag: any, visibility: boolean) => void;
};

export const WordCloudContext = createContext<TWordCloudContext | null>(null);

export const WordCloudProvider = ({ children }) => {
  const [fixedPopover, setFixedPopover] = useState(<></>);
  const [showOnlyMainSkillsState, setShowOnlyMainSkillsState] = useState(
    defaultWordCloudFilterSettings.showOnlyMainSkills
  );
  const [mobilePopoverVisibility, setMobilePopoverVisibility] = useState(false);
  const [mobilePopoverTag, setMobilePopoverTag] = useState({
    icon: "",
    value: "",
    count: 0,
    color: "",
    description: "",
  });

  const getVisibleExperiences = () => {
    if (showOnlyMainSkillsState) {
      return experience.experienceCore;
    } else {
      return Object.values(experience).flat();
    }
  };

  const visibleExperiences = useMemo(
    () => getVisibleExperiences(),
    [showOnlyMainSkillsState]
  );

  const mutateMobilePopover = (tag, visibility) => {
    setMobilePopoverTag(tag);
    setMobilePopoverVisibility(visibility);
  };

  const wordCloudContext = {
    fixedPopover,
    setFixedPopover,
    visibleExperiences,
    showOnlyMainSkillsState,
    setShowOnlyMainSkillsState,
    mobilePopoverTag,
    mobilePopoverVisibility,
    mutateMobilePopover,
  };

  return (
    <WordCloudContext.Provider value={wordCloudContext}>
      {children}
    </WordCloudContext.Provider>
  );
};

export const { Consumer } = WordCloudContext;
