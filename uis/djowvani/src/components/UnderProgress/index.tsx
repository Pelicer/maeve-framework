import styled from "styled-components";

import Image from "next/image";

import { callbackWhenWindowObject } from "utils/windowUtils";

import {
  fadeIn,
  flicker,
  backgroundFadeIn,
  shadowPop,
  curtainFadeout,
} from "@/styles/abstracts/_keyframes";

const LogoContainer = styled.div`
  transition: 5s all;

  :hover {
    filter: invert(1);
  }
`;

const Curtain = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: black;

  animation: ${curtainFadeout} 2s cubic-bezier(0.19, 1, 0.22, 1) 2.1s both;
  -webkit-animation: ${curtainFadeout} 2s cubic-bezier(0.19, 1, 0.22, 1) 2.1s
    both;
`;

const StyledUnderProgress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  /* background-image: url("https://s9.gifyu.com/images/AO84.gif"); */
  background-position: center;
  background-size: cover;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  z-index: 999999;

  -webkit-animation: ${backgroundFadeIn} 2s
    cubic-bezier(0.895, 0.03, 0.685, 0.22) both;
  animation: ${backgroundFadeIn} 2s cubic-bezier(0.895, 0.03, 0.685, 0.22) both;

  h1 {
    -webkit-animation: ${fadeIn} 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) 6s
      both;
    animation: ${fadeIn} 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) 6s both;
  }

  p {
    -webkit-animation: ${fadeIn} 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) 4s
      both;
    animation: ${fadeIn} 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) 4s both;
  }
`;

const StyledDropTheMoon = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 200;

  -webkit-animation: ${flicker} 4s 6s linear both;
  animation: ${flicker} 4s 6s linear both;

  &:hover {
    ::after {
      position: absolute;
      margin-top: 1rem;
      content: "👁 eyes on you 👁";

      -webkit-animation: ${shadowPop} 0.6s both;
      animation: ${shadowPop} 0.6s both;
    }
  }
`;

const UnderProgress = () => {
  return (
    <>
      <Curtain />
      <StyledUnderProgress>
        <LogoContainer>
          <Image src={"/img/logo.png"} alt={"logo"} width={300} height={300} />
        </LogoContainer>
        <p style={{ paddingTop: "20px" }}>ɢɪᴏᴠᴀɴɪ, ᴡᴇʙ ᴅᴇᴠᴇʟᴏᴘᴇʀ</p>
        <h1>under progress</h1>
      </StyledUnderProgress>
    </>
  );
};

export default UnderProgress;
