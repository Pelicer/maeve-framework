import React, { createContext, useState } from "react";

type TScrollTargetContext = {
  scrollTarget: number;
  setScrollTarget: React.Dispatch<React.SetStateAction<number>>;
  globalScrollDisable: boolean;
  setGlobalScrollDisable: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScrollTargetContext = createContext<TScrollTargetContext | null>(
  null
);

export const ScrollTargetProvider = ({ children }) => {
  const [scrollTarget, setScrollTarget] = useState(2);
  const [globalScrollDisable, setGlobalScrollDisable] = useState(false);

  const scrollTargetContext = {
    scrollTarget,
    setScrollTarget,
    globalScrollDisable,
    setGlobalScrollDisable,
  };

  return (
    <ScrollTargetContext.Provider value={scrollTargetContext}>
      {children}
    </ScrollTargetContext.Provider>
  );
};

export const { Consumer } = ScrollTargetContext;
