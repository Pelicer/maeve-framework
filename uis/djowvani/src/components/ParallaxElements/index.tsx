import styled, { css } from "styled-components";
import Image from "next/image";

import { callbackWhenWindowObject, isMobile } from "@/utils/windowUtils";

import { backgroundParallaxZIndex } from "@/styles/abstracts/_variables";

export const Container = styled.div`
  position: fixed;
  z-index: ${backgroundParallaxZIndex};
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    top: -5px;
  }
`;

export const Layer = styled.div<{ source?: string; mobile?: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 30%;
  z-index: -1;

  img {
    height: auto !important;
  }

  ${({ source }) =>
    source &&
    css`
      background-image: url(${source});
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
    `};

  ${({ mobile }) =>
    mobile &&
    css`
      scale: 0.9;
      width: 100%;
      height: 92%;
      display: flex;
      align-items: center;
      justify-content: center;
    `};
`;

const ParallaxElements = () => {
  const ParallaxLayers = [
    {
      name: "globe",
      dataDepth: "0.022",
      source: "/img/parallax-globe.webp",
      style: { scale: "0.75", top: "-60px" },
      eagerLoading: true,
    },
    {
      name: "controller",
      dataDepth: "0.6",
      source: "/img/parallax-controller.webp",
    },
    {
      name: "disc",
      dataDepth: "2",
      source: "/img/parallax-disc.webp",
    },
    {
      name: "wormhole",
      dataDepth: "0.8",
      source: "/img/parallax-wormhole.webp",
    },
    {
      name: "angel",
      dataDepth: "1.2",
      source: "/img/parallax-angel.webp",
    },
    {
      name: "meltCube",
      dataDepth: "0.7",
      source: "/img/parallax-meltCube.webp",
    },
    {
      name: "pizza",
      dataDepth: "0.7",
      source: "/img/parallax-pizza.webp",
    },
    {
      name: "blackhole",
      dataDepth: "1",
      source: "/img/parallax-blackhole.webp",
    },
    {
      name: "cube",
      dataDepth: "2",
      source: "/img/parallax-cube.webp",
    },
  ];

  const addParallaxEffectOnLayers = () => {
    window.addEventListener("scroll", (event) => {
      var depth,
        layer,
        layers,
        movement,
        translate3d,
        _i,
        _len,
        topDistance,
        opacity,
        depthOpacity,
        scrollYLimit;

      layers = document.querySelectorAll("[data-type='parallax']");
      topDistance = window.scrollY;
      scrollYLimit =
        Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) - window.innerHeight;

      for (_i = 0, _len = layers.length; _i < _len; _i++) {
        layer = layers[_i];
        depth = layer.getAttribute("data-depth");
        movement = (scrollYLimit - topDistance) * depth;
        opacity = depth;
        translate3d = "translate3d(0, " + movement + "px, 0)";
        depthOpacity = `blur(${opacity}px)`;
        layer.style["-webkit-transform"] = translate3d;
        layer.style["-moz-transform"] = translate3d;
        layer.style["-ms-transform"] = translate3d;
        layer.style["-o-transform"] = translate3d;
        layer.style.transform = translate3d;
      }
    });
  };

  callbackWhenWindowObject(addParallaxEffectOnLayers);

  return (
    <Container>
      {isMobile() ? (
        <Layer data-type="parallax" data-depth="0.022" mobile>
          <Image
            src="/img/parallax-globe-mobile.webp"
            width={150}
            height={150}
            alt={`Background parallax globe`}
            loading="eager"
          />
        </Layer>
      ) : (
        <>
          {ParallaxLayers.map((layer) => (
            <Layer
              key={layer.source}
              data-type="parallax"
              data-depth={layer.dataDepth}
              style={layer.style}
            >
              <Image
                priority
                src={layer.source}
                fill={true}
                alt={`Background parallax ${layer.name}`}
                loading="eager"
              />
            </Layer>
          ))}
        </>
      )}
    </Container>
  );
};

export default ParallaxElements;
