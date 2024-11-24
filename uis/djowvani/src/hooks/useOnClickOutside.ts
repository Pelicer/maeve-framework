import { useEffect, RefObject } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: (params: unknown) => void,
  ignoreElement?: string | string[]
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        ignoreElement &&
        Array.isArray(ignoreElement) &&
        ignoreElement.some((element) =>
          document.querySelector(element)?.contains(event.target as Node)
        )
      )
        return;

      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (ignoreElement &&
          typeof ignoreElement === "string" &&
          document.querySelector(ignoreElement)?.contains(event.target as Node))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, ignoreElement]);
};
