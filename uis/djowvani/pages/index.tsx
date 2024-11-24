import React from "react";
import dynamic from "next/dynamic";

import Head from "@/components/Head";
import Intro from "@/components/Intro";
import AboutMe from "@/components/AboutMe";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import BackgroundAnimationContainer from "@/components/BackgroundAnimationContainer";
import EyeCandy from "@/components/EyeCandy";
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Curtain = dynamic(() => import("@/components/Curtain"), { ssr: false });
const Billboard = dynamic(() => import("@/components/Billboard"), {
  ssr: false,
});
const ExtraVisualElements = dynamic(
  () => import("@/components/ExtraVisualElements"),
  { ssr: false }
);
const MultiSoundPlayer = dynamic(
  () => import("@/components/MultiSoundPlayer"),
  { ssr: false }
);
const ScrollDownIndicator = dynamic(
  () => import("@/components/ScrolldownIndicator"),
  { ssr: false }
);
const ParallaxElements = dynamic(
  () => import("@/components/ParallaxElements"),
  { ssr: false }
);
const BackgroundAnimation = dynamic(
  () => import("@/components/BackgroundAnimation/BackgroundAnimation"),
  { ssr: false }
);
const UnderProgress = dynamic(() => import("@/components/UnderProgress"), {
  ssr: false,
});

import { soundEffectsArray } from "@/data/index";
import GlobalStyle from "@/styles/global";

const Home = () => {
  const WIPLock = false;

  return (
    <main id="main">
      <Curtain logo />
      <ParallaxElements />
      <BackgroundAnimationContainer />
      <Head />
      <GlobalStyle />
      <MultiSoundPlayer addingSoundEffects={soundEffectsArray} />
      <ScrollDownIndicator />

      <>
        <CustomCursor />

        {WIPLock ? (
          <UnderProgress />
        ) : (
          <>
            <BackgroundAnimation />
            <ExtraVisualElements />

            <Billboard
              discriminator="home"
              scrollableId={1}
              fullscreen
              header={{ hasFading: true }}
              aria-label="Main section"
            >
              <Intro />
            </Billboard>

            <Billboard
              discriminator="about"
              scrollableId={2}
              aria-label="About me section"
            >
              <AboutMe />
            </Billboard>

            <Billboard
              discriminator="work"
              scrollableId={3}
              aria-label="Work and experience section"
            >
              <Work
                wordCloud={{ vertical: true, desktopSeparatePopover: true }}
                monochrome
              />
            </Billboard>

            <Billboard
              discriminator="contact"
              scrollableId={4}
              aria-label="Contact me section"
            >
              <Contact />
            </Billboard>
          </>
        )}
      </>
      <Footer />
      <EyeCandy />
    </main>
  );
};

export default Home;
