import { Dispatch, SetStateAction, useContext, useEffect } from "react";

import { SoundEffectsContext } from "@/context/soundEffectsContext";

interface IUnrerenderableExternalSoundPlayer {
  triggeringSound: string;
  setStateToInject: Dispatch<SetStateAction<JSX.Element>>;
}

const UnrerenderableExternalSoundPlayer: React.FC<
  IUnrerenderableExternalSoundPlayer
> = ({ triggeringSound, setStateToInject }) => {
  const { soundEffectsObject } = useContext(SoundEffectsContext);
  const handleTriggerSoundEffect = (triggeringSound) => {
    const sound = soundEffectsObject[`${triggeringSound}`];
    sound.play();
  };

  handleTriggerSoundEffect(triggeringSound);

  useEffect(() => {
    setStateToInject(null);
  }, []);

  return <></>;
};

export default UnrerenderableExternalSoundPlayer;
