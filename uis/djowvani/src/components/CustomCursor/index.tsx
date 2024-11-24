import { useContext } from "react";
import styled, { css } from "styled-components";

import { CursorContentContext } from "@/context/cursorContentContext";

import { callbackWhenWindowObject } from "utils/windowUtils";

import {
  customCursorZIndex,
  grayLight1,
  grayLight2,
  cursorContentZIndex,
} from "@/styles/abstracts/_variables";

export const Container = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const CustomCursorContainer = styled.div<{ shape: string }>`
  ${({ shape }) => {
    if (shape === "circular")
      return css`
        & div {
          border-radius: 100%;
        }
      `;
    if (shape === "keyhole")
      return css`
        & div {
          background: black;
          height: 100px;
          width: 100px;
          border-radius: 50px;
        }
        & div::before {
          content: "";
          border-bottom: 110px solid black;
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
        }
      `;
    if (shape === "triangular crosshair")
      return css`
        & div {
          border-bottom: 110px solid black;
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
        }
      `;
  }}
`;

export const InnerCustomCursor = styled.div`
  z-index: ${customCursorZIndex};
  width: 20px;
  height: 20px;
  background-color: ${grayLight2};
  mix-blend-mode: difference;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width 0.3s, height 0.3s, opacity 0.3s;
`;

export const OuterCustomCursor = styled.div`
  z-index: ${customCursorZIndex};
  width: 50px;
  height: 50px;
  border: 1px solid ${grayLight1};
  transition: all 200ms ease-out;
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  transform: translate(calc(-50%), -50%);
`;

const StyledCursorContent = styled.div<{ is_visible: number }>`
  display: flex;
  visibility: ${({ is_visible }) =>
    Boolean(is_visible) ? "visible" : "hidden"};
  justify-content: center;
  z-index: ${cursorContentZIndex};
  position: fixed;
  pointer-events: none;
`;

const addMouseEventsListenerOnCustomCursor = () => {
  var customCursor = document.getElementById("customCursor");

  if (typeof customCursor !== "undefined") {
    var innerCursor = document.getElementById("innerCursor");
    var outerCursor = document.getElementById("outerCursor");
    var cursorContent = document.getElementById("cursorContent");

    customCursor.style.visibility = "hidden";

    document.addEventListener("mousemove", (e) => {
      customCursor.style.visibility = "visible";

      cursorContent.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      innerCursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      outerCursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    document.addEventListener("mousedown", (e) => {
      if (e.button !== 1) {
        innerCursor.classList.toggle("innerMousePressed");
        outerCursor.classList.toggle("outerMousePressed");
      }
    });

    document.addEventListener("mouseup", () => {
      innerCursor.classList.toggle("innerMousePressed");
      outerCursor.classList.toggle("outerMousePressed");
    });
  }
};

const CustomCursor: React.FC = () => {
  const { cursorContent, cursorShape, cursorVisibility } =
    useContext(CursorContentContext);

  callbackWhenWindowObject(addMouseEventsListenerOnCustomCursor);

  return (
    <Container id="customCursor">
      <CustomCursorContainer id="customCursorContainer" shape={cursorShape}>
        <InnerCustomCursor id="innerCursor" />
        <OuterCustomCursor id="outerCursor" />
      </CustomCursorContainer>

      <StyledCursorContent
        id="cursorContent"
        is_visible={cursorVisibility ? 1 : 0}
        aria-live="polite"
      >
        {cursorContent}
      </StyledCursorContent>
    </Container>
  );
};

export default CustomCursor;
