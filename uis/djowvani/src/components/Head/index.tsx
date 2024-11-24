import React from "react";
import NextHead from "next/head";

import { headTabTitle } from "@/data/index";

const Head: React.FC = () => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />

    <meta
      name="description"
      content="Giovani's website portfolio showcasing experiences and projects, with expertise focused in front-end technologies."
    />
    <meta
      name="keywords"
      content="react, javascript, typescript, nextjs, vercel, web development, web dev, frontend, front-end, portfolio, projects, software developer, software engineer, coding"
    ></meta>

    <link rel="icon" href="/img/logo.webp" />

    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;700;900&display=swap"
      rel="stylesheet"
    />

    {/* <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-globe.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-controller.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-disc.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-wormhole.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-angel.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-meltCube.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-pizza.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-blackhole.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-cube.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/arm.webp"
      type="image/webp"
    />

    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/arm-mobile.webp"
      type="image/webp"
    />
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/img/parallax-globe-mobile.webp"
      type="image/webp"
    /> */}

    <title>{headTabTitle}</title>
  </NextHead>
);

export default Head;
