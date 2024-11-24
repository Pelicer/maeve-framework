import { useContext, useEffect, useState } from "react";

import { TSoundPlayer } from "@/context/soundEffectsContext";
import { SettingsContext } from "@/context/settingsContext";

type TSoundSource = {
  url: string;
  audio: HTMLAudioElement;
};

export const useMultiAudio = (urls) => {
  const getInitialPlayers = () => {
    return urls.map((url) => ({
      url,
      playing: false,
    }));
  };
  const getInitialSources = (): TSoundSource[] => {
    return urls.map((url) => {
      let newAudio = new Audio(url);
      newAudio.volume = 0.2;

      return {
        url,
        audio: newAudio,
      };
    });
  };

  const { soundsEnabled } = useContext(SettingsContext);
  const [players, setPlayers] = useState<TSoundPlayer[]>(getInitialPlayers());
  const sources = getInitialSources();

  const playAudio = (targetIndex) => () => {
    if (soundsEnabled) {
      sources.forEach((source, i) => {
        if (targetIndex === i) {
          let toPlayAudio = new Audio(source.url);
          toPlayAudio.volume = 0.2;
          toPlayAudio.play();
          toPlayAudio = null;
        }
      });
    }
  };

  const toggleAudio = (targetIndex) => () => {
    if (soundsEnabled) {
      const newPlayers = [...players];
      newPlayers[targetIndex].playing = true;
      setPlayers(newPlayers);
    }
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, playAudio, toggleAudio] as const;
};
