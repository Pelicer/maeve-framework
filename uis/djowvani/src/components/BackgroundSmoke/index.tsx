import { useEffect, useState } from "react";
import Script from "next/script";
import styled from "styled-components";

import {
  backgroundSmokeTint,
  backgroundSmokeTintZIndex,
} from "@/styles/abstracts/_variables";

const BackgroundSmokeTint = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: ${backgroundSmokeTintZIndex};
  background-color: ${backgroundSmokeTint};
`;

const squashedSmokeFluidScript = ["/fluids-2d-master/js/f2d/oneshot.js"];

const BackgroundSmoke: React.FC = () => {
  const [readyToSmoke, setReadyToSmoke] = useState(false);
  const [smoke, setSmoke] = useState([]);

  const getMinThree = () => (
    <Script
      // src={"https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"}
      src={"/fluids-2d-master/js/vendor/three.min.js"}
      key={"ThreeMin"}
      script-group="backgroundSmokeScript"
      strategy="lazyOnload"
      onLoad={() => {
        // console.log(`THREE MIN LOADED`);
      }}
      onError={() => {
        // console.log(`THREE MIN FAILED`);
      }}
      onReady={() => {
        setReadyToSmoke(true);
      }}
    />
  );

  const renderSmokeFluidSimulation = () => {
    const scriptComponents = squashedSmokeFluidScript.map((srcPath) => (
      <Script
        src={srcPath}
        key={srcPath}
        script-group="backgroundSmokeScript"
        strategy="lazyOnload"
      />
    ));
    setSmoke(scriptComponents);
  };

  useEffect(() => {
    renderSmokeFluidSimulation();
  }, [readyToSmoke]);

  return (
    <div id="backgroundSmokeAux">
      <BackgroundSmokeTint id="backgroundSmokeTint" />
      {getMinThree()}
      {readyToSmoke && smoke}
    </div>
  );
};

export default BackgroundSmoke;
