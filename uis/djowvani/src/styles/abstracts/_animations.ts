import { css } from "styled-components";

import {
  scrollUp,
  scrollDown,
  slideInUp,
  thankYouSlideInUp,
  fadeIn,
  fadeOut,
  fadeInFromTop,
  fadeInFromLeft,
  wordCloudToggleOptionLeft,
  wordCloudToggleOptionRight,
  fadeOutFromLeft,
  clickTip,
  clickTipBackground,
  fadeOutFromRight,
  slideInDown,
  pulsate,
  slideOutDown,
  trackingInExpand,
  slideInBlurredLeft,
  textFocusIn,
  fluidSphere,
  sphereOutline,
  circularCrosshairOutline,
  flicker,
  susUnderscoreFlicker,
  quickShaking,
  loading,
  mobileWordCloudToggleOptionLeft,
  mobileWordCloudToggleOptionRight,
} from "@/styles/abstracts/_keyframes";

export const curtainAnimation = css`
  animation: ${fadeOut} 2s 3.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  -webkit-animation: ${fadeOut} 2s 3.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    both;
`;
export const logoFadeOutAnimation = css`
  animation: ${fadeOut} 2s 1.33s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  -webkit-animation: ${fadeOut} 2s 1.33s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    both;
`;
export const loadingAnimation = css`
  animation: ${loading} 2s cubic-bezier(0.95, 0.05, 0.795, 0.035) both;
  -webkit-animation: ${loading} 2s cubic-bezier(0.95, 0.05, 0.795, 0.035) both;
`;
export const clickTipAnimation = css`
  animation: ${clickTip} 1.33s both;
  -webkit-animation: ${clickTip} 1.33s both;
`;
export const clickTipBackgroundAnimation = css`
  animation: ${clickTipBackground} 1.33s 0.25s both;
  -webkit-animation: ${clickTipBackground} 1.33s 0.25s both;
`;
export const animationModalFadeInAnimation = css`
  animation: ${fadeIn} 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  -webkit-animation: ${fadeIn} 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
`;
export const animationModalFadeOutAnimation = css`
  animation: ${fadeOut} 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  -webkit-animation: ${fadeOut} 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
`;
export const smokeFluidFadeInAnimation = css`
  animation: ${fadeIn} 1.2s linear both;
  -webkit-animation: ${fadeIn} 1.2s linear both;
`;
export const smokeFluidFadeOutAnimation = css`
  animation: ${fadeOut} 1.2s linear both;
  -webkit-animation: ${fadeOut} 1.2s linear both;
`;
export const headerAnimation = css`
  animation: ${slideInDown} 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) both;
  -webkit-animation: ${slideInDown} 1.5s cubic-bezier(0.075, 0.82, 0.165, 1)
    both;
`;
export const billboardTextsAnimation = css`
  animation: ${textFocusIn} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  -webkit-animation: ${textFocusIn} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const scrollDownIndicatorUpAnimation = css`
  animation: ${slideInUp} 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) both;
  -webkit-animation: ${slideInUp} 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) both;
`;
export const thankYouAnimation = css`
  animation: ${thankYouSlideInUp} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    both;
  -webkit-animation: ${thankYouSlideInUp} 0.3s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
`;
export const scrollDownIndicatorDownAnimation = css`
  animation: ${slideOutDown} 1s cubic-bezier(0.6, 0.04, 0.98, 0.335) both;
  -webkit-animation: ${slideOutDown} 1s cubic-bezier(0.6, 0.04, 0.98, 0.335)
    both;
`;
export const scrollDownIndicatorScrollButtonAnimation = css`
  animation: ${scrollDown} 2s infinite;
  -webkit-animation: ${scrollDown} 2s infinite;
`;
export const scrollDownIndicatorScrollButtonMobileAnimation = css`
  animation: ${scrollUp} 2s infinite;
  -webkit-animation: ${scrollUp} 2s infinite;
`;
export const experienceAnimation = css`
  animation: ${fadeInFromLeft} 0.6s cubic-bezier(0.19, 1, 0.22, 1) both;
  -webkit-animation: ${fadeInFromLeft} 0.6s cubic-bezier(0.19, 1, 0.22, 1) both;
`;
export const popoverFadeInAnimation = css`
  animation: ${fadeInFromLeft} 0.6s cubic-bezier(0.19, 1, 0.22, 1) both;
  -webkit-animation: ${fadeInFromLeft} 0.6s cubic-bezier(0.19, 1, 0.22, 1) both;
`;
export const popoverFadeOutAnimation = css`
  animation: ${fadeOutFromRight} 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  -webkit-animation: ${fadeOutFromRight} 0.6s cubic-bezier(0.19, 1, 0.22, 1)
    forwards;
`;
export const socialMediasAnimation = css`
  animation: ${fadeInFromTop} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  -webkit-animation: ${fadeInFromTop} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
`;
export const eyeballPulsateAnimation = css`
  animation: ${pulsate} 1.5s ease-in-out infinite both;
  -webkit-animation: ${pulsate} 1.5s ease-in-out infinite both;
`;
export const fluidSphereAnimation = css`
  animation: ${fluidSphere} 5s ease-in-out infinite both;
  -webkit-animation: ${fluidSphere} 5s ease-in-out infinite both;
`;
export const sphereOutlineAnimation = css`
  animation: ${sphereOutline} 5s ease-in-out infinite both;
  -webkit-animation: ${sphereOutline} 5s ease-in-out infinite both;
`;
export const circularCrosshairOutlineAnimation = css`
  animation: ${circularCrosshairOutline} 2s linear infinite both;
  -webkit-animation: ${circularCrosshairOutline} 2s linear infinite both;
`;
export const desktopRequiredTooltipFadeInAnimation = css`
  animation: ${fadeIn} 1s cubic-bezier(0.075, 0.82, 0.165, 1) both;
  -webkit-animation: ${fadeIn} 1s cubic-bezier(0.075, 0.82, 0.165, 1) both;
`;
export const desktopRequiredTooltipFadeOutAnimation = css`
  animation: ${fadeOut} 1s cubic-bezier(0.075, 0.82, 0.165, 1) both;
  -webkit-animation: ${fadeOut} 1s cubic-bezier(0.075, 0.82, 0.165, 1) both;
`;
export const bearDialogueInAnimation = css`
  animation: ${fadeInFromLeft} 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  -webkit-animation: ${fadeInFromLeft} 0.2s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
`;
export const bearDialogueOutAnimation = css`
  animation: ${fadeOutFromLeft} 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  -webkit-animation: ${fadeOutFromLeft} 0.2s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
`;
export const susUnderscoreFlickerAnimation = css`
  animation: ${susUnderscoreFlicker} 4s linear infinite both;
  -webkit-animation: ${susUnderscoreFlicker} 4s linear infinite both;
`;
export const shakingPromptAnimation = css`
  animation: ${quickShaking} 0.5s linear both;
  -webkit-animation: ${quickShaking} 0.5s linear both;
`;
export const promptFadeInAnimation = css`
  animation: ${fadeIn} 1.2s linear both;
  -webkit-animation: ${fadeIn} 1.2s linear both;
`;
export const wordCloudToggleOptionLeftToRightAnimation = css`
  animation: ${wordCloudToggleOptionLeft} 0.4s cubic-bezier(0.19, 1, 0.22, 1)
    both;
  -webkit-animation: ${wordCloudToggleOptionLeft} 0.4s
    cubic-bezier(0.19, 1, 0.22, 1) both;
`;
export const wordCloudToggleOptionRightToLeftAnimation = css`
  animation: ${wordCloudToggleOptionRight} 0.4s cubic-bezier(0.19, 1, 0.22, 1)
    both;
  -webkit-animation: ${wordCloudToggleOptionRight} 0.4s
    cubic-bezier(0.19, 1, 0.22, 1) both;
`;
export const mobileWordCloudToggleOptionLeftToRightAnimation = css`
  animation: ${mobileWordCloudToggleOptionLeft} 0.4s
    cubic-bezier(0.19, 1, 0.22, 1) both;
  -webkit-animation: ${mobileWordCloudToggleOptionLeft} 0.4s
    cubic-bezier(0.19, 1, 0.22, 1) both;
`;
export const mobileWordCloudToggleOptionRightToLeftAnimation = css`
  animation: ${mobileWordCloudToggleOptionRight} 0.4s
    cubic-bezier(0.19, 1, 0.22, 1) both;
  -webkit-animation: ${mobileWordCloudToggleOptionRight} 0.4s
    cubic-bezier(0.19, 1, 0.22, 1) both;
`;
export const wordCloudSpanFadeInAnimation = css`
  animation: ${fadeIn} 0.25s cubic-bezier(0.19, 1, 0.22, 1) both;
  -webkit-animation: ${fadeIn} 0.25s cubic-bezier(0.19, 1, 0.22, 1) both;
`;
export const wordCloudSpanFadeOutAnimation = css`
  animation: ${fadeOut} 0.25s cubic-bezier(0.19, 1, 0.22, 1) both;
  -webkit-animation: ${fadeOut} 0.25s cubic-bezier(0.19, 1, 0.22, 1) both;
`;
