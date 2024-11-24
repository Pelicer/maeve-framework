import { keyframes } from "styled-components";

import { black1 } from "@/styles/abstracts/_variables";

export const shadowPop = keyframes`
  0% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
    text-shadow: 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555;
  }
  100% {
    transform: translateY(8px);
    -webkit-transform: translateY(8px);
    text-shadow: 0 -1px #555555, 0 -2px #555555, 0 -3px #555555, 0 -4px #555555, 0 -5px #555555, 0 -6px #555555, 0 -7px #555555, 0 -8px #555555;
  }
`;

export const puffOutHorizontal = keyframes`
  0% {
    opacity: 1;
    transform: scaleX(1);
    -webkit-transform: scaleX(1);
    filter: blur(0px);
    -webkit-filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: scaleX(2);
    -webkit-transform: scaleX(2);
    filter: blur(4px);
    -webkit-filter: blur(4px);
  }
`;

export const trackingInExpand = keyframes`
  0% {
    opacity: 0;
    letter-spacing: -0.5em;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeIn = keyframes`
  0% {
    visibility: visible;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

export const fadeInFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
    -webkit-transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
`;

export const backgroundFadeIn = keyframes`
  0% {
    opacity: 0;
    background-color: ${black1};
  }
  100% {
    opacity: 1;
  }
`;

export const scrollDown = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0px);
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    transform: translate(0, 20px);
  }
  100% {
    opacity: 0;
  }
`;

export const scrollUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 20px);
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    transform: translate(0, 0px);
  }
  100% {
    opacity: 0;
  }
`;

export const flicker = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
    text-shadow: none;
  }
  10.1% {
    opacity: 1;
    text-shadow: none;
  }
  10.2% {
    opacity: 0;
    text-shadow: none;
  }
  20% {
    opacity: 0;
    text-shadow: none;
  }
  20.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
  }
  20.6% {
    opacity: 0;
    text-shadow: none;
  }
  30% {
    opacity: 0;
    text-shadow: none;
  }
  30.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.5% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.6% {
    opacity: 0;
    text-shadow: none;
  }
  45% {
    opacity: 0;
    text-shadow: none;
  }
  45.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  55% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  55.1% {
    opacity: 0;
    text-shadow: none;
  }
  57% {
    opacity: 0;
    text-shadow: none;
  }
  57.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
  }
  60% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
  }
  60.1% {
    opacity: 0;
    text-shadow: none;
  }
  65% {
    opacity: 0;
    text-shadow: none;
  }
  65.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75.1% {
    opacity: 0;
    text-shadow: none;
  }
  77% {
    opacity: 0;
    text-shadow: none;
  }
  77.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  85% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  85.1% {
    opacity: 0;
    text-shadow: none;
  }
  86% {
    opacity: 0;
    text-shadow: none;
  }
  86.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
  }
`;

export const slideInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(1000px);
    -webkit-transform: translateY(1000px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
`;
export const thankYouSlideInUp = keyframes`
  0% {
    transform: translateY(250px);
    -webkit-transform: translateY(250px);
  }
  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
`;

export const slideInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-1000px);
    -webkit-transform: translateY(-1000px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
`;

export const slideOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(1000px);
    -webkit-transform: translateY(1000px);
  }
`;

export const curtainFadeout = keyframes`
  0% {
    opacity: 1;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  100% {
    opacity: 0;
    transform: translateZ(-80px);
    -webkit-transform: translateZ(-80px);
  }
`;

export const loading = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: 300px;
  }
`;

export const clickTip = keyframes`
  0% {
    opacity: 0;
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
  }
`;
export const clickTipBackground = keyframes`
  0% {
    opacity: 0.8;
    transform: scale(0.2);
    -webkit-transform: scale(0.2);
  }
  80% {
    opacity: 0;
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(2.2);
    -webkit-transform: scale(2.2);
  }
`;

export const fadeInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
    -webkit-transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
`;
export const fadeOutFromLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50px);
    -webkit-transform: translateX(-50px);
  }
  `;
export const fadeOutFromRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  99% {
    opacity: 0;
    transform: translateX(50px);
    -webkit-transform: translateX(50px);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
`;
export const slideInBlurredLeft = keyframes`
  0% {
    opacity: 0;
    transform: rotateX(-30deg) translateX(-300px) skewX(-30deg);
    -webkit-transform: rotateX(-30deg) translateX(-300px) skewX(-30deg);
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg) translateX(0) skewX(0deg);
    -webkit-transform: rotateX(0deg) translateX(0) skewX(0deg);
  }
`;
export const wordCloudToggleOptionLeft = keyframes`
  0% {
    transform: translateX(-60px);
    -webkit-transform: translateX(-60px);
  }
  100% {
    transform: translateX(60px);
    -webkit-transform: translateX(60px);
  }
`;
export const wordCloudToggleOptionRight = keyframes`
  0% {
    transform: translateX(60px);
    -webkit-transform: translateX(60px);
  }
  100% {
    transform: translateX(-60px);
    -webkit-transform: translateX(-60px);
  }
`;
export const mobileWordCloudToggleOptionLeft = keyframes`
  0% {
    transform: translateX(-50px);
    -webkit-transform: translateX(-50px);
  }
  100% {
    transform: translateX(50px);
    -webkit-transform: translateX(50px);
  }
`;
export const mobileWordCloudToggleOptionRight = keyframes`
  0% {
    transform: translateX(50px);
    -webkit-transform: translateX(50px);
  }
  100% {
    transform: translateX(-50px);
    -webkit-transform: translateX(-50px);
  }
`;

export const textFocusIn = keyframes`
 0% {
   opacity: 0;
   filter: blur(12px);
   -webkit-filter: blur(12px);
 }
 100% {
   opacity: 1;
   filter: blur(0px);
   -webkit-filter: blur(0px);
 }
`;

export const pulsate = keyframes`
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;
export const fluidSphere = keyframes`
  0% {
    clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
  }
  10% {
    clip-path: polygon(13% 5%, 65% 12%, 76% 25%, 92% 39%, 83% 67%, 82% 94%, 46% 89%, 8% 93%, 18% 65%, 3% 40%);
  }
  20% {
    clip-path: polygon(46% 13%, 66% 20%, 85% 39%, 91% 69%, 83% 87%, 66% 94%, 33% 88%, 15% 74%, 16% 47%, 24% 23%);
  }
  30% {
    clip-path: polygon(49% 6%, 76% 13%, 93% 35%, 97% 68%, 83% 87%, 66% 94%, 38% 82%, 25% 66%, 16% 47%, 34% 29%);
  }
  40% {
    clip-path: polygon(43% 4%, 65% 25%, 87% 36%, 84% 63%, 78% 87%, 66% 94%, 30% 94%, 6% 75%, 2% 29%, 20% 14%);
  }
  50% {
    clip-path: polygon(46% 4%, 76% 9%, 79% 35%, 92% 60%, 89% 88%, 67% 100%, 44% 81%, 20% 75%, 9% 40%, 28% 25%);
  }
  60% {
    clip-path: polygon(42% 10%, 73% 13%, 94% 28%, 90% 53%, 86% 73%, 67% 88%, 45% 99%, 14% 81%, 20% 47%, 14% 10%);
  }
  70% {
    clip-path: polygon(51% 16%, 73% 13%, 94% 28%, 80% 54%, 86% 73%, 67% 88%, 42% 81%, 14% 88%, 5% 49%, 31% 43%);
  }
  80% {
    clip-path: polygon(40% 10%, 61% 21%, 86% 19%, 81% 51%, 94% 86%, 67% 88%, 37% 96%, 13% 91%, 5% 57%, 10% 28%);
  }
  90% {
    clip-path: polygon(40% 10%, 64% 1%, 86% 19%, 93% 48%, 94% 86%, 73% 90%, 46% 100%, 19% 90%, 5% 59%, 9% 23%);
  }
  100% {
    clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
  }
`;
export const sphereOutline = keyframes`
  0% {
    border-radius: 100%;
    clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  }
  100% {
    border-radius: 100%;
    clip-path: polygon(0 35%, 35% 35%, 35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%);
  }
`;
export const circularCrosshairOutline = keyframes`
  0% {
    border-radius: 100%;
    clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  }
  50% {
    border-radius: 100%;
    clip-path: polygon(0 35%, 35% 35%, 35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%);
  }
  100% {
    border-radius: 100%;
    clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  }
`;
export const quickShaking = keyframes`
  0%,
  100% {
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    transform: translateX(-1px);
    -webkit-transform: translateX(-1px);
  }
  20%,
  40%,
  60% {
    transform: translateX(1px);
    -webkit-transform: translateX(1px);
  }
  90% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
`;
export const susUnderscoreFlicker = keyframes`
  0% {
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  1.02% {
    opacity: 1;
  }
  8.98% {
    opacity: 1;
  }
  9% {
    opacity: 0;
  }
  9.8% {
    opacity: 1;
  }
  9.82% {
    opacity: 0;
  }
  9.48% {
    opacity: 1;
  }
  9.5% {
    opacity: 1;
  }
  9.6% {
    opacity: 1;
  }
  9.62% {
    opacity: 1;
  }
  14.98% {
    opacity: 1;
  }
  15% {
    opacity: 0.5;
  }
  15.8% {
    opacity: 0.5;
  }
  15.82% {
    opacity: 1;
  }
  15.18% {
    opacity: 1;
  }
  15.2% {
    opacity: 0.7;
  }
  16% {
    opacity: 0.7;
  }
  16.02% {
    opacity: 1;
  }
  15.48% {
    opacity: 1;
  }
  15.5% {
    opacity: 0.5;
  }
  16.2% {
    opacity: 0.5;
  }
  16.22% {
    opacity: 1;
  }
  16.98% {
    opacity: 1;
  }
  17% {
    opacity: 1;
  }
  17.8% {
    opacity: 1;
  }
  17.82% {
    opacity: 1;
  }
  20.48% {
    opacity: 1;
  }
  20.5% {
    opacity: 0.9;
  }
  21.3% {
    opacity: 0.9;
  }
  21.32% {
    opacity: 1;
  }
  20.98% {
    opacity: 1;
  }
  21% {
    opacity: 1;
  }
  22% {
    opacity: 1;
  }
  22.02% {
    opacity: 1;
  }
  39.98% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  41% {
    opacity: 1;
  }
  41.02% {
    opacity: 1;
  }
  40.48% {
    opacity: 1;
  }
  40.5% {
    opacity: 0.6;
  }
  41.4% {
    opacity: 0.6;
  }
  41.42% {
    opacity: 1;
  }
  41.98% {
    opacity: 1;
  }
  42% {
    opacity: 1;
  }
  42.8% {
    opacity: 1;
  }
  42.82% {
    opacity: 1;
  }
  59.98% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  61% {
    opacity: 1;
  }
  61.02% {
    opacity: 1;
  }
  60.18% {
    opacity: 1;
  }
  60.2% {
    opacity: 0.2;
  }
  61% {
    opacity: 0.2;
  }
  61.02% {
    opacity: 1;
  }
  60.78% {
    opacity: 1;
  }
  60.8% {
    opacity: 0.4;
  }
  61.6% {
    opacity: 0.4;
  }
  61.62% {
    opacity: 1;
  }
  61.38% {
    opacity: 1;
  }
  61.4% {
    opacity: 0;
  }
  62.2% {
    opacity: 0;
  }
  62.22% {
    opacity: 1;
  }
  61.78% {
    opacity: 1;
  }
  61.8% {
    opacity: 1;
  }
  62.8% {
    opacity: 1;
  }
  62.82% {
    opacity: 1;
  }
  75.98% {
    opacity: 1;
  }
  76% {
    opacity: 1;
  }
  77% {
    opacity: 1;
  }
  77.02% {
    opacity: 1;
  }
  77.98% {
    opacity: 1;
  }
  78% {
    opacity: 0.7;
  }
  78.8% {
    opacity: 0.7;
  }
  78.82% {
    opacity: 1;
  }
  78.98% {
    opacity: 1;
  }
  79% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  80.02% {
    opacity: 1;
  }
  99.98% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
  101% {
    opacity: 1;
  }
  101.02% {
    opacity: 1;
  }
`;
