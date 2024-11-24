import React, { createContext, useState } from "react";

type TBackgroundAnimationContext = {
  sceneBackgroundColor: number;
  setSceneBackgroundColor: React.Dispatch<React.SetStateAction<number>>;
  activeCamera: number;
  changeCameraPosition: (targetCanera?: string) => void;
  wireframeMaterialColor: number;
  setWireframeMaterialColor: React.Dispatch<React.SetStateAction<number>>;
  torusRotateSpeed: number;
  setTorusRotateSpeed: React.Dispatch<React.SetStateAction<number>>;
  torusArcSegments: number;
  setTorusArcSegments: React.Dispatch<React.SetStateAction<number>>;
  sphereColor: number;
  setSphereColor: React.Dispatch<React.SetStateAction<number>>;
  sphereRotateSpeed: number;
  setSphereRotateSpeed: React.Dispatch<React.SetStateAction<number>>;
  latheRotateSpeed: number;
  setLatheRotateSpeed: React.Dispatch<React.SetStateAction<number>>;
  firstCameraLock: boolean;
  setFirstCameraLock: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BackgroundAnimationContext =
  createContext<TBackgroundAnimationContext | null>(null);

export const BackgroundAnimationProvider = ({ children }) => {
  const [sceneBackgroundColor, setSceneBackgroundColor] = useState(0x000000);
  const [activeCamera, setActiveCamera] = useState(0);
  const [firstCameraLock, setFirstCameraLock] = useState(true);
  const [wireframeMaterialColor, setWireframeMaterialColor] =
    useState(0xffffff);
  const [torusRotateSpeed, setTorusRotateSpeed] = useState(0.00025);
  const [torusArcSegments, setTorusArcSegments] = useState(6.283185307179586);
  const [sphereColor, setSphereColor] = useState(0xffffff);
  const [sphereRotateSpeed, setSphereRotateSpeed] = useState(0.00025);
  const [latheRotateSpeed, setLatheRotateSpeed] = useState(0.0025);

  const changeCameraPosition = (targetCamera = null) => {
    if (targetCamera === "ending") {
      setActiveCamera(9999);
      return;
    }
    if (firstCameraLock) {
      setFirstCameraLock(false);
    }

    setActiveCamera((previsousValue) => {
      if (previsousValue + 1 === 5) return 0;
      else {
        return previsousValue + 1;
      }
    });
  };

  const backgroundAnimationContext = {
    sceneBackgroundColor,
    setSceneBackgroundColor,
    activeCamera,
    changeCameraPosition,
    wireframeMaterialColor,
    setWireframeMaterialColor,
    torusRotateSpeed,
    setTorusRotateSpeed,
    torusArcSegments,
    setTorusArcSegments,
    sphereColor,
    setSphereColor,
    sphereRotateSpeed,
    setSphereRotateSpeed,
    latheRotateSpeed,
    setLatheRotateSpeed,
    firstCameraLock,
    setFirstCameraLock,
  };

  return (
    <BackgroundAnimationContext.Provider value={backgroundAnimationContext}>
      {children}
    </BackgroundAnimationContext.Provider>
  );
};

export const { Consumer } = BackgroundAnimationContext;
