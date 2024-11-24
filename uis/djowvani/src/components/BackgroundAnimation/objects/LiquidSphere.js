import { SphereGeometry, MeshBasicMaterial, Mesh, Vector2 } from "three";

const LiquidSphere = () => {
  const sphereGeometry = new SphereGeometry(4, 32, 16);
  const sphereMaterial = new MeshBasicMaterial({ color: 0xff0000 });
  const sphere = new Mesh(sphereGeometry, sphereMaterial);

  water = new Water(sphereGeometry, {
    color: params.color,
    scale: params.scale,
    flowDirection: new Vector2(params.flowX, params.flowY),
    textureWidth: 1024,
    textureHeight: 1024,
  });

  water.position.y = 1;
  water.rotation.x = Math.PI * -0.5;

  return sphere;
};

export default LiquidSphere();
