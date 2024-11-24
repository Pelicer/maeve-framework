import React, { createContext, useState } from "react";

type TCursorContentContext = {
  cursorContent: any;
  cursorShape: string;
  cursorVisibility: boolean;
  mutateCursorContent: (content: any, visibility: boolean) => void;
};

export const CursorContentContext = createContext<TCursorContentContext | null>(
  null
);

export const CursorContentProvider = ({ children }) => {
  const [cursorContent, setCursorContent] = useState();
  const [cursorShape, setCursorShape] = useState("circular");
  const [cursorVisibility, setCursorVisibility] = useState(false);

  const mutateCursorContent = (content: any, visibility: boolean) => {
    setCursorContent(content);
    setCursorVisibility(visibility);
  };

  const mutateCursorShape = (shape) => {
    setCursorShape(shape);
  };

  const cursorContentContext = {
    cursorContent,
    cursorShape,
    cursorVisibility,
    mutateCursorContent,
    mutateCursorShape,
  };

  return (
    <CursorContentContext.Provider value={cursorContentContext}>
      {children}
    </CursorContentContext.Provider>
  );
};

export const { Consumer } = CursorContentContext;
