import { TorusGeometry, WireframeGeometry, LineSegments } from "three";

const WireframeTorus = () => {
  const torusGeometry = new TorusGeometry(10, 9.5, 30, 100);
  const wireframeGeometry = new WireframeGeometry(torusGeometry);
  const wireframeTorus = new LineSegments(wireframeGeometry);
  wireframeTorus.material.depthTest = false;
  wireframeTorus.material.opacity = 0.25;
  wireframeTorus.material.transparent = true;
  wireframeTorus.rotation.x = 5;
  wireframeTorus.rotation.y = -3;
  //   wireframeTorus.rotation.z += 0.00025;

  return wireframeTorus;
};

export default WireframeTorus();
