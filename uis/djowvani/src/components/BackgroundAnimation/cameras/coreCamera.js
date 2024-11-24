import { PerspectiveCamera } from "three";

import { callbackWhenWindowObject } from "@/utils/windowUtils";

var coreCamera;

const createCoreCamera = () => {
  coreCamera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  coreCamera.position.z = 18;

  return coreCamera;
};

export default coreCamera = callbackWhenWindowObject(createCoreCamera);
