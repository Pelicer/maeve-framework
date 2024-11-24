import React, { createContext, useState } from "react";

type TSettingsContext = {
  effectsEnabled: boolean;
  setEffectsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  effectsVisibility: boolean;
  setEffectsVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  soundsEnabled: boolean;
  setSoundsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  tabNavigationUnlock: boolean;
  setTabNavigationUnlock: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsContext = createContext<TSettingsContext | null>(null);

export const SettingsProvider = ({ children }) => {
  const [effectsEnabled, setEffectsEnabled] = useState(false);
  const [effectsVisibility, setEffectsVisibility] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [tabNavigationUnlock, setTabNavigationUnlock] = useState(false);

  const settingsContext = {
    effectsEnabled,
    setEffectsEnabled,
    effectsVisibility,
    setEffectsVisibility,
    soundsEnabled,
    setSoundsEnabled,
    tabNavigationUnlock,
    setTabNavigationUnlock,
  };

  return (
    <SettingsContext.Provider value={settingsContext}>
      {children}
    </SettingsContext.Provider>
  );
};

export const { Consumer } = SettingsContext;
