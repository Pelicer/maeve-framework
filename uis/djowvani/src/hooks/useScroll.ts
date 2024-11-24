import { useState } from "react";

import { callbackWhenWindowObject } from "@/utils/windowUtils";

export const useScroll = () => {
  const [scrollYPosition, setScrollYPosition] = useState<number>(0);

  const addScrollEventListener = () => {
    window.addEventListener("scroll", (event) => {
      setScrollYPosition(window.scrollY);
    });
  };

  callbackWhenWindowObject(addScrollEventListener);

  return { scrollYPosition } as const;
};
