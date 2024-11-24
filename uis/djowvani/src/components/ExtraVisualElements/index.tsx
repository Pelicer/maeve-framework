import { useContext } from "react";
import dynamic from "next/dynamic";

import { SettingsContext } from "@/context/settingsContext";
import { isMobile } from "@/utils/windowUtils";

const BackgroundSmoke = dynamic(() => import("@/components/BackgroundSmoke"), {
  ssr: false,
});

const ExtraVisualElements: React.FC = () => {
  const { effectsEnabled } = useContext(SettingsContext);
  const shouldRenderBackgroundSmoke = effectsEnabled && !isMobile();

  return (
    <div id="extraVisualElements">
      {shouldRenderBackgroundSmoke && <BackgroundSmoke />}
    </div>
  );
};

export default ExtraVisualElements;
