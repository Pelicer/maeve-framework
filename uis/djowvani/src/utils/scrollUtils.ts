import scrollIntoView from "scroll-into-view";
import { callbackWhenWindowObject, isMobile } from "./windowUtils";

export const scrollIntoTarget = (scrollTargetId) => {
  let scrollTargetElement = document.getElementById(
    `scrollTarget-${scrollTargetId}`
  );
  scrollIntoView(scrollTargetElement, {
    time: 1500,
  });
};

export const getScrollYLimit = () => {
  return callbackWhenWindowObject(
    () =>
      Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight
  );
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const scrollToBottom = () => {
  window.scrollTo(0, getScrollYLimit());
};
