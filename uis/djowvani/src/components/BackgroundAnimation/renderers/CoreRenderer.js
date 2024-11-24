import { WebGLRenderer } from "three";

import coreCamera from "../cameras/coreCamera";
import coreScene from "../scenes/coreScene";

const CoreRenderer = () => {
  const appendRendererIntoDom = () => {
    var renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = "backgroundRender";
    renderer.render(coreScene, coreCamera);
    document.body.appendChild(renderer.domElement);
  };

  callbackWhenWindowObject(appendRendererIntoDom);
};

export default CoreRenderer;
