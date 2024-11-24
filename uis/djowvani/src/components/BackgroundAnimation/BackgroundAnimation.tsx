import React, { useContext } from "react";
import {
  Scene as threeScene,
  Color as threeColor,
  Mesh as threeMesh,
  Vector2 as threeVector2,
  Vector3 as threeVector3,
  TextureLoader as threeTextureLoader,
  LineSegments as threeLineSegments,
  PerspectiveCamera as threePerspectiveCamera,
  WebGLRenderer as threeWebGLRenderer,
  TorusGeometry as threeTorusGeometry,
  SphereGeometry as threeSphereGeometry,
  LatheGeometry as threeLatheGeometry,
  WireframeGeometry as threeWireframeGeometry,
  LineBasicMaterial as threeLineBasicMaterial,
  MeshBasicMaterial as threeMeshBasicMaterial,
} from "three";
import {
  update as tweenupdate,
  Tween as tweenTween,
  Easing as tweenEasing,
} from "@tweenjs/tween.js";
// import { Canvas, useFrame } from "@react-three/fiber";

import { BackgroundAnimationContext } from "@/context/backgroundAnimationContext";
import { isMobile } from "@/utils/windowUtils";
// import { callbackWhenWindowObject } from "utils/windowUtils";

// import { sphere_with_waves } from "./sphere_with_waves";
// import { Water } from "./textures/waterTexture";

const BackgroundAnimation = () => {
  const {
    sceneBackgroundColor,
    wireframeMaterialColor,
    torusArcSegments,
    torusRotateSpeed,
    sphereRotateSpeed,
    latheRotateSpeed,
    activeCamera,
    firstCameraLock,
  } = useContext(BackgroundAnimationContext);

  const getWindowRenderer = (type) => {
    // console.log("window.innerHeight: ", window.innerHeight);
    // console.log("window.innerWidth: ", window.innerWidth);
    if (isMobile()) {
      if (type === "height") {
        return window.innerHeight;
      } else if (type === "width") {
        return window.innerWidth;
      }
    } else {
      if (type === "height") {
        return window.innerHeight;
      } else if (type === "width") {
        return window.innerWidth;
      }
    }
  };

  // ============================ TEXTURES ============================
  // const textureLoader = new threeTextureLoader();

  // const waterBaseColor = textureLoader.load("./textures/Water_002_COLOR.jpg");
  // const waterNormalMap = textureLoader.load("./textures/Water_002_NORM.jpg");
  // const waterHeightMap = textureLoader.load("./textures/Water_002_DISP.png");
  // const waterRoughness = textureLoader.load("./textures/Water_002_ROUGH.jpg");
  // const waterAmbientOcclusion = textureLoader.load(
  //   "./textures/Water_002_OCC.jpg"
  // );
  // ============================ SCENE ============================
  const scene = new threeScene();
  scene.background = new threeColor(sceneBackgroundColor);

  // ============================ CAMERA ============================
  const camera = new threePerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 18;

  // ============================ MATERIALS ============================
  const wireframeMaterial = new threeLineBasicMaterial({
    color: wireframeMaterialColor,
    depthTest: false,
    opacity: 0.25,
    transparent: true,
  });

  // ============================ RENDERER ============================
  const renderer = new threeWebGLRenderer();
  // const renderer = new threeWebGLRenderer({ antialias: true });
  renderer.setSize(getWindowRenderer("width"), getWindowRenderer("height"));
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.domElement.id = "backgroundRender";
  renderer.domElement.style.height = "100vh";

  const backgroundRenderContainerElement = document.getElementById(
    "BackgroundAnimationContainer"
  );
  backgroundRenderContainerElement.appendChild(renderer.domElement);

  // ============================ OBJECTS ============================

  // ================= TORUS =================

  const torusGeometry = new threeTorusGeometry(
    10,
    9.5,
    30,
    100,
    torusArcSegments
  );
  const wireframeTorusGeometry = new threeWireframeGeometry(torusGeometry);
  const wireframeTorus = new threeLineSegments(
    wireframeTorusGeometry,
    wireframeMaterial
  );
  wireframeTorus.rotation.x = 5;
  wireframeTorus.rotation.y = -3;
  wireframeTorus.rotation.z = 10;

  scene.add(wireframeTorus);

  // ================= SPHERE =================
  const sphereGeometry = new threeSphereGeometry(3, 64, 32);
  const wireframeSphereGeometry = new threeWireframeGeometry(sphereGeometry);
  const wireframeSphere = new threeLineSegments(
    wireframeSphereGeometry,
    wireframeMaterial
  );
  wireframeSphere.rotation.z = -0.15;

  scene.add(wireframeSphere);

  // ================= LATHE =================
  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new threeVector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
  }

  const geometry = new threeLatheGeometry(points);
  const material = new threeMeshBasicMaterial({ color: 0xffffff });
  const lathe = new threeMesh(geometry, material);
  lathe.position.x = 0;
  lathe.position.y = 10;
  lathe.position.z = 500;
  lathe.rotation.x = 1.5;
  lathe.rotation.y = 0;
  lathe.rotation.z = 6.28;
  scene.add(lathe);

  const latheGeometry = new threeLatheGeometry(points);
  const wireframeLatheGeometry = new threeWireframeGeometry(latheGeometry);
  const wireframeLathe = new threeLineSegments(
    wireframeLatheGeometry,
    wireframeMaterial
  );

  wireframeLathe.position.x = 0;
  wireframeLathe.position.y = 0;
  wireframeLathe.position.z = 50;
  // wireframeLathe.rotation.x = 4.71;
  wireframeLathe.rotation.x = 1.5;
  wireframeLathe.rotation.y = 0;
  wireframeLathe.rotation.z = 3.14;

  scene.add(wireframeLathe);

  // ============================ EXECUTION ============================

  const animate = () => {
    tweenupdate();

    // camera.position.z = 0;
    // camera.position.x = -5;
    // camera.rotation.y = 10;

    wireframeTorus.rotation.z += torusRotateSpeed;
    // wireframeTorus.rotation.x += 0.01;

    wireframeSphere.rotation.y += sphereRotateSpeed;
    // wireframeSphere.rotation.z += 0.025;
    // wireframeSphere.rotation.x += 0.025;

    wireframeLathe.rotation.y += latheRotateSpeed;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  // ============================ ANIMATING ============================

  const originalViewCameraPosition = new threeVector3(0, 0, 18);
  const originalViewCameraRotation = new threeVector3(0, 0, 0);
  const originalViewWireframeSphereRotation = new threeVector3(0, 0, -0.15);
  const originalViewAnimationDuration = 1000;
  const altView00CameraPosition = new threeVector3(3, -1, 2.5);
  const altView00CameraRotation = new threeVector3(1, 0, 0);
  const altView00WireframeSphereRotation = new threeVector3(0, 0, 6.5);
  const altView00AnimationDuration = 1000;
  const altView01CameraPosition = new threeVector3(-3, 0, 3);
  const altView01CameraRotation = new threeVector3(0, 0, 1.55);
  const altView01WireframeSphereRotation = new threeVector3(6, 0, 8);
  const altView01AnimationDuration = 1000;
  const altView02CameraPosition = new threeVector3(0.75, 7, 2);
  const altView02CameraRotation = new threeVector3(-1.25, 0, 0);
  const altView02WireframeSphereRotation = new threeVector3(0.13, -1, 2.96);
  const altView02AnimationDuration = 1000;
  const altView03CameraPosition = new threeVector3(-6, -3, 18.24);
  const altView03CameraRotation = new threeVector3(0.15, 0.0015, 4.5);
  const altView03WireframeSphereRotation = new threeVector3(0, 0, 0);
  const altView03AnimationDuration = 1000;
  const endingViewCameraPosition = new threeVector3(0, 0, 30);
  const endingViewCameraRotation = new threeVector3(0, 3.13, 0);
  const endingViewWireframeSphereRotation = new threeVector3(0, 0, 0);
  const endingViewAnimationDuration = 6000;

  const createTween = (targetValues, property, duration, startingPoint) => {
    return new tweenTween(startingPoint)
      .to(targetValues, duration)
      .easing(tweenEasing.Quadratic.InOut)
      .onUpdate(() => {
        if (property === "position") {
          camera.position.set(
            startingPoint.x,
            startingPoint.y,
            startingPoint.z
          );
        } else if (property === "rotation") {
          camera.rotation.set(
            startingPoint.x,
            startingPoint.y,
            startingPoint.z
          );
        } else if (property === "wireframeSphereRotation") {
          wireframeSphere.rotation.set(
            startingPoint.x,
            startingPoint.y,
            startingPoint.z
          );
        }
      });
  };

  // ====== OG View ======

  const originalViewCameraPositionTween = createTween(
    originalViewCameraPosition,
    "position",
    originalViewAnimationDuration,
    altView03CameraPosition
  );
  const originalViewCameraRotationTween = createTween(
    originalViewCameraRotation,
    "rotation",
    originalViewAnimationDuration,
    altView03CameraRotation
  );
  const originalViewWireframeSphereRotationTween = createTween(
    originalViewWireframeSphereRotation,
    "wireframeSphereRotation",
    originalViewAnimationDuration,
    altView03WireframeSphereRotation
  );

  const originalView = () => {
    originalViewCameraPositionTween.start();
    originalViewCameraRotationTween.start();
    originalViewWireframeSphereRotationTween.start();
  };

  if (activeCamera === 0 && !firstCameraLock) {
    originalView();
  }

  // ====== Side Sphere Down-Up View ======

  const altView00PositionTween = createTween(
    altView00CameraPosition,
    "position",
    altView00AnimationDuration,
    originalViewCameraPosition
  );
  const altView00RotationTween = createTween(
    altView00CameraRotation,
    "rotation",
    altView00AnimationDuration,
    originalViewCameraRotation
  );
  const altView00WireframeSphereRotationTween = createTween(
    altView00WireframeSphereRotation,
    "wireframeSphereRotation",
    altView00AnimationDuration,
    originalViewWireframeSphereRotation
  );

  const altView00 = () => {
    altView00PositionTween.start();
    altView00RotationTween.start();
    altView00WireframeSphereRotationTween.start();
  };

  if (activeCamera === 1) {
    altView00();
  }

  // ====== Side Sphere View ======

  const altView01PositionTween = createTween(
    altView01CameraPosition,
    "position",
    altView01AnimationDuration,
    altView00CameraPosition
  );
  const altView01RotationTween = createTween(
    altView01CameraRotation,
    "rotation",
    altView01AnimationDuration,
    altView00CameraRotation
  );
  const altView01WireframeSphereRotationTween = createTween(
    altView01WireframeSphereRotation,
    "wireframeSphereRotation",
    altView01AnimationDuration,
    altView00WireframeSphereRotation
  );

  const altView01 = () => {
    altView01PositionTween.start();
    altView01RotationTween.start();
    altView01WireframeSphereRotationTween.start();
  };

  if (activeCamera === 2) {
    altView01();
  }

  // ====== Void Eye View ======

  const altView02PositionTween = createTween(
    altView02CameraPosition,
    "position",
    altView02AnimationDuration,
    altView01CameraPosition
  );
  const altView02RotationTween = createTween(
    altView02CameraRotation,
    "rotation",
    altView02AnimationDuration,
    altView01CameraRotation
  );
  const altView02WireframeSphereRotationTween = createTween(
    altView02WireframeSphereRotation,
    "wireframeSphereRotation",
    altView02AnimationDuration,
    altView01WireframeSphereRotation
  );

  const altView02 = () => {
    altView02PositionTween.start();
    altView02RotationTween.start();
    altView02WireframeSphereRotationTween.start();
  };

  if (activeCamera === 3) {
    altView02();
  }

  // ====== OG Rotated View ======

  const altView03PositionTween = createTween(
    altView03CameraPosition,
    "position",
    altView03AnimationDuration,
    altView02CameraPosition
  );
  const altView03RotationTween = createTween(
    altView03CameraRotation,
    "rotation",
    altView03AnimationDuration,
    altView02CameraRotation
  );
  const altView03WireframeSphereRotationTween = createTween(
    altView03WireframeSphereRotation,
    "wireframeSphereRotation",
    altView03AnimationDuration,
    altView02WireframeSphereRotation
  );

  const altView03 = () => {
    altView03PositionTween.start();
    altView03RotationTween.start();
    altView03WireframeSphereRotationTween.start();
  };

  if (activeCamera === 4) {
    altView03();
  }
  // ====== Ending View ======

  const endingViewPositionTween = createTween(
    endingViewCameraPosition,
    "position",
    endingViewAnimationDuration,
    originalViewCameraPosition
  );
  const endingViewRotationTween = createTween(
    endingViewCameraRotation,
    "rotation",
    endingViewAnimationDuration,
    originalViewCameraRotation
  );
  const endingViewWireframeSphereRotationTween = createTween(
    endingViewWireframeSphereRotation,
    "wireframeSphereRotation",
    endingViewAnimationDuration,
    originalViewWireframeSphereRotation
  );

  const endingView = () => {
    endingViewPositionTween.start();
    endingViewRotationTween.start();
    endingViewWireframeSphereRotationTween.start();
  };

  if (activeCamera === 9999) {
    endingView();
  }

  return <></>;
};

export default BackgroundAnimation;
