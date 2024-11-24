import { Scene } from "three";

import sphere from "../objects/LiquidSphere";
import wireframeTorus from "../objects/WireframeTorus";

const coreScene = new Scene();

coreScene.add(sphere);
coreScene.add(wireframeTorus);

export default coreScene;
