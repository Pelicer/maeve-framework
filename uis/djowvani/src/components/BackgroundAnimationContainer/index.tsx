import styled from "styled-components";

import { backgroundRenderZIndex } from "@/styles/abstracts/_variables";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  z-index: ${backgroundRenderZIndex};
`;

const BackgroundAnimationContainer = () => {
  return <Container id="BackgroundAnimationContainer" />;
};

export default BackgroundAnimationContainer;
