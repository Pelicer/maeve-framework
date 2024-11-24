import { useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import styled, { css } from "styled-components";
import { loadFull } from "tsparticles";

import MobilePopover from "@/components/MobilePopover";

import { isMobile } from "@/utils/windowUtils";
import { particlesZIndex } from "@/styles/abstracts/_variables";

import WordCloudFilter from "./WordCloudFilter";
import WordCloudComponent from "./WordCloudComponent";
import FixedPopover from "../FixedPopover";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 0 0 20rem 0;
  }
`;

const WordCloudContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 18rem;

  @media screen and (max-width: 1024px) {
    min-height: 32rem;
  }
`;

interface IParticlesContainer {
  tagsQuantity: number;
  vertical: boolean;
}
const ParticlesContainer = styled.div<IParticlesContainer>`
  position: absolute;
  z-index: ${particlesZIndex};
  transition: 5s all;

  ${({ tagsQuantity, vertical }) =>
    vertical
      ? css`
          #tsparticles {
            width: 90rem;
            height: 20rem;
          }
        `
      : tagsQuantity > 45
      ? css`
          #tsparticles {
            width: 40rem;
            height: 30rem;
          }
        `
      : css`
          #tsparticles {
            width: 40rem;
            height: 25rem;
          }
        `};

  @media screen and (max-width: 1024px) {
    #tsparticles {
      width: 100%;
      height: 30rem;
    }
  }
`;

interface IWordCloud {
  monochrome?: boolean;
  vertical?: boolean;
  desktopSeparatePopover?: boolean;
}

const WordCloud: React.FC<IWordCloud> = ({
  monochrome = false,
  vertical = false,
  desktopSeparatePopover = false,
}) => {
  const wordCloudRef = useRef(null);
  const particlesContainerRef = useRef(null);

  let isWithoutBlur = true;

  const renderParticlesContainer = () => (
    <ParticlesContainer
      tagsQuantity={30}
      ref={particlesContainerRef}
      id="particlesContainer"
      vertical={vertical}
    >
      <Particles
        init={async (main) => {
          await loadFull(main);
        }}
        options={{
          // container: ref,
          // canvasClassName: '',
          fullScreen: {
            enable: false,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "repulse",
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 225,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesContainer>
  );

  const loopBlurEffect = () => {
    setTimeout(() => {
      if (isWithoutBlur) {
        particlesContainerRef.current.style.filter = "blur(10px)";
        isWithoutBlur = false;
      } else {
        particlesContainerRef.current.style.filter = "blur(0px)";
        isWithoutBlur = true;
      }
      loopBlurEffect();
    }, 5000);
  };

  useEffect(() => {
    loopBlurEffect();
  }, []);

  return (
    <Container>
      <WordCloudFilter />

      <WordCloudContainer ref={wordCloudRef}>
        {renderParticlesContainer()}

        <WordCloudComponent
          monochrome={monochrome}
          desktopSeparatePopover={desktopSeparatePopover}
        />
      </WordCloudContainer>

      {isMobile() ? (
        <MobilePopover
          monochrome={monochrome}
          fadeAwayReference={wordCloudRef}
        />
      ) : (
        <FixedPopover />
      )}
    </Container>
  );
};

export default WordCloud;
