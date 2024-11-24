import React, { createContext, useState } from "react";

export type TSoundPlayer = {
  url: string;
  playing: boolean;
};

export type TSoundEffect = {
  id: string;
  player: TSoundPlayer;
  play: () => void;
  toggle: () => void;
};

type TSoundEffectsContext = {
  soundEffects: TSoundEffect[];
  setSoundEffects: React.Dispatch<React.SetStateAction<TSoundEffect[]>>;
  soundEffectsObject: any;
  setSoundEffectsObject: React.Dispatch<React.SetStateAction<{}>>;
};

export const SoundEffectsContext = createContext<TSoundEffectsContext | null>(
  null
);

export const SoundEffectsProvider = ({ children }) => {
  const [soundEffects, setSoundEffects] = useState<TSoundEffect[]>([]);
  const [soundEffectsObject, setSoundEffectsObject] = useState({});

  const soundEffectsContext = {
    soundEffects,
    setSoundEffects,
    soundEffectsObject,
    setSoundEffectsObject,
  };

  return (
    <SoundEffectsContext.Provider value={soundEffectsContext}>
      {children}
    </SoundEffectsContext.Provider>
  );
};

export const { Consumer } = SoundEffectsContext;
