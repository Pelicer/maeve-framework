import { Dispatch, SetStateAction } from "react";

import UnrerenderableExternalSoundPlayer from "@/components/UnrerenderableExternalSoundPlayer";

export const injectUnrerenderableSoundEffect = (
  setStateToInject: Dispatch<SetStateAction<JSX.Element>>,
  triggeringSound: string
) => {
  setStateToInject(
    <UnrerenderableExternalSoundPlayer
      triggeringSound={triggeringSound}
      setStateToInject={setStateToInject}
    />
  );
};
