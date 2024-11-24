import React, { useContext, useEffect } from "react";

import { useMultiAudio } from "@/hooks/useMultiAudio";

import { SoundEffectsContext } from "@/context/soundEffectsContext";
import { SettingsContext } from "@/context/settingsContext";

type TAddingSoundEffect = {
  id: string;
  url: string;
};

interface IMultiSoundPlayer {
  addingSoundEffects: TAddingSoundEffect[];
}

const MultiSoundPlayer: React.FC<IMultiSoundPlayer> = ({
  addingSoundEffects,
}) => {
  const soundEffectUrls = addingSoundEffects.map(
    (soundEffect) => soundEffect.url
  );

  const [players, playAudio, toggleAudio] = useMultiAudio(soundEffectUrls);
  const { setSoundEffects, setSoundEffectsObject } =
    useContext(SoundEffectsContext);
  const { soundsEnabled } = useContext(SettingsContext);

  useEffect(() => {
    const soundEffects = players.map((player, i) => ({
      id: addingSoundEffects.find((addingSoundEffect) => {
        if (player.url === addingSoundEffect.url) return addingSoundEffect.id;
      }).id,
      player,
      play: playAudio(i),
      toggle: toggleAudio(i),
    }));
    setSoundEffects(soundEffects);
    const soundEffectsObject = soundEffects.reduce(
      (accumulator, currentValue) => {
        const ident = currentValue.id;
        return { ...accumulator, [ident]: currentValue };
      },
      {}
    );
    setSoundEffectsObject(soundEffectsObject);
  }, [players, soundsEnabled]);

  return null;
};

export default MultiSoundPlayer;
