import React, { createContext, useState } from "react";

export type TForceBool = "true" | "false";

type TModalContext = {
  modalContent: any;
  modalVisibility: boolean;
  mutateModal: (content: any, visibility: boolean) => void;
  animationModalVisibility: boolean;
  toggleAnimationModalVisibility: (forceBool?: TForceBool) => void;
};

export const ModalContext = createContext<TModalContext | null>(null);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModal] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [animationModalVisibility, setAnimationModalVisibility] =
    useState(true);

  const toggleAnimationModalVisibility = (forceBool?: TForceBool) => {
    if (forceBool) {
      const forcedBoolean = forceBool === "true" ? true : false;
      setAnimationModalVisibility(forcedBoolean);
      return;
    }
    setAnimationModalVisibility((previousValue) => !previousValue);
  };

  const mutateModal = (content, visibility) => {
    setModal(content);
    setModalVisibility(visibility);
  };

  const modalContentContext = {
    modalContent,
    modalVisibility,
    animationModalVisibility,
    mutateModal,
    toggleAnimationModalVisibility,
  };

  return (
    <ModalContext.Provider value={modalContentContext}>
      {children}
    </ModalContext.Provider>
  );
};

export const { Consumer } = ModalContext;
