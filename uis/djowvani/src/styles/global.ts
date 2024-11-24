import { createGlobalStyle } from "styled-components";

import {
  backgroundSmokeZIndex,
  backgroundRenderZIndex,
  black1,
  grayDark1,
  grayLight2,
  scrollbarWidth,
  solidWhite,
  hoveredLinkColor,
} from "@/styles/abstracts/_variables";
import {
  smokeFluidFadeOutAnimation,
  eyeballPulsateAnimation,
  fluidSphereAnimation,
  smokeFluidFadeInAnimation,
} from "./abstracts/_animations";

export default createGlobalStyle`

* {
  cursor: none;
  margin: 0;
  padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 300;
    
    ::selection {
      background: ${grayDark1};
    }
  }
  
  html {
    width: 100%;
    height: 100%;
    overflow: overlay;
    background-color: ${black1};
    color: ${solidWhite};
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    
    /* https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
    /* https://css-tricks.com/the-notch-and-css/ */
    /* https://www.lambdatest.com/blog/how-to-use-css-breakpoints-for-responsive-design/ */
    @media (max-width: 1024px) {
      font-size: 0.8rem;
    }
  }
  
  body {
    overflow: hidden;
  }

  h1 {
    font-weight: 100;
  }

  button {
    border: none;
  }

  a {
    text-decoration: underline;
    transition: color 0.5s;
  }

  a:hover {
    color: ${hoveredLinkColor};
  }

  a:active {
    color: ${solidWhite};
  }

  .innerMousePressed {
    width: 50px;
    height: 50px;

    ${fluidSphereAnimation}
  }
  .outerMousePressed {
    width: 5px;
    height: 5px;
  }
  .innerMouseEye {
    width: 50px;
    height: 50px;
    background: radial-gradient(black, white);
    ${eyeballPulsateAnimation}
  }
  .outerMouseEye {
    width: 5px;
    height: 5px;
  }

  .extraLink {
    color: ${solidWhite};
  }
  .extraLink:hover {
    color: ${hoveredLinkColor};
  }
  .extraLink:active {
    color: ${solidWhite};
  }
  .extraLink:focus-visible {
    outline: 1px solid ${solidWhite};
  }

  ::-webkit-scrollbar {
    width: ${scrollbarWidth}px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    transition: background-color 0.75s linear;
    background-image: -webkit-linear-gradient(
                          90deg,
                          transparent,
                          ${grayLight2},
                          ${grayLight2},
                          transparent);
  }

  ::-webkit-scrollbar-corner {
    border-radius: 10px;
  }
  
  #backgroundRender {
    top: 0;
    z-index: ${backgroundRenderZIndex};
    position: fixed;
  }

  #backgroundSmoke {
    top: 0;
    z-index: ${backgroundSmokeZIndex};
    position: fixed;
    filter: grayscale(1);
  }

  .backgroundSmokeVisibilityOn {
    ${smokeFluidFadeInAnimation}
  }

  .backgroundSmokeVisibilityOff {
    ${smokeFluidFadeOutAnimation}
  }
`;
