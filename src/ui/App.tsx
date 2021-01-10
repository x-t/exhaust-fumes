import { useState } from "react";
import "../css/App.css";
import useBackground from "../hooks/useBackground";
import BackgroundImage from "./Background";
import SettingsPanel from "./SettingsPanel";
import { ReactComponent as FAWrench } from "../svg/wrench.svg";
import Gadgets from "./Gadgets";
import useGadgets from "../hooks/useGadgets";
import { useGadgetBackgroundOverride } from "../hooks/useGadgetBackgroundOverride";
import { BackgroundContext } from "./BackgroundContext";

const App = () => {
  const [openedSettings, setOpenSettings] = useState(false);
  const background = useBackground();
  const gadgets = useGadgets();
  const [isOverride, setOverride] = useGadgetBackgroundOverride();

  return (
    <>
      <BackgroundContext.Provider
        value={{
          isOverriden: isOverride.is,
          setOverride: setOverride,
          overridenBy: isOverride.by,
        }}
      >
        <BackgroundImage background={background} />
        <Gadgets gadgets={gadgets} />

        {openedSettings && (
          <SettingsPanel
            background={background}
            gadgets={gadgets}
            selfState={setOpenSettings}
          />
        )}
      </BackgroundContext.Provider>

      <div className="SettingsBtn" style={{ width: "45px" }}>
        <button
          onClick={() => {
            setOpenSettings((current) => !current);
          }}
        >
          <FAWrench />
        </button>
      </div>
    </>
  );
};

export default App;
