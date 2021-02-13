import React, { useState } from "react";
import { GadgetProps } from "../lib/gadget";
import Switch from "react-switch";
import { BackgroundContext } from "../ui/BackgroundContext";

interface AfterDarkGadgetSettings {
  enabled: boolean;
  background: string;
}

export const AfterDarkGadgetDefaults: AfterDarkGadgetSettings = {
  enabled: false,
  background: "flying-toasters",
};

const BackgroundIframe = ({background}: {background: string}) => {
  return (
    <iframe
      src={`./after-dark-css/all/${background}.html`}
      title={`After Dark Background ${background}`}
      frameBorder={0}
      height="100%"
      width="100%"
    />
  );
};

const afterDarkBackground = [
  "bouncing-ball",
  "fade-out",
  "fish",
  "flying-toasters",
  "globe",
  "hard-rain",
  "logo",
  "messages",
  "messages2",
  "rainstorm",
  "spotlight",
  "warp",
];

const makeHumanName = (name: string) =>
  name === "messages2"
    ? "Messages 2" /* Edge case, because "Messages2" isn't correct */
    : name
        .split("-")
        .map((word) => word[0].toUpperCase() + word.substr(1))
        .join(" ");

const AfterDarkGadget = (props: GadgetProps<AfterDarkGadgetSettings>) => {
  return (
    <div
      className="BackgroundImage AfterDarkGadget"
      style={{ display: "initial" }}
    >
      <BackgroundIframe 
        background={props.settings.background}
      />

    </div>
  );
};

export const AfterDarkGadgetSettingsNode = (
  props: GadgetProps<AfterDarkGadgetSettings>
) => {
  const [gadgetToggle, setGadgetToggle] = useState(props.settings.enabled);
  const [backgroundSelected, setBackgroundSelected] = useState(
    props.settings.background
  );

  return (
    <>
      <div className="SettingsNode">
        <p>Enable After Dark Gadget</p>
        <label>
          <BackgroundContext.Consumer>
            {(value) => (
              <>
                {!(
                  value.isOverriden === true &&
                  value.overridenBy !== "AfterDarkGadget"
                ) ? (
                  <Switch
                    checked={gadgetToggle}
                    onChange={() => {
                      setGadgetToggle((cur) => !cur);
                      props.setSettings((cur) => ({
                        ...cur,
                        enabled: !cur.enabled,
                      }));
                      value.setOverride!(({ is, by }) =>
                        is
                          ? by === "AfterDarkGadget"
                            ? { is: false, by: "" }
                            : { is, by } /* Background is overriden not by us */
                          : { is: true, by: "AfterDarkGadget" }
                      );
                    }}
                    className="AfterDarkGadgetSwitch"
                    height={25}
                    width={50}
                  />
                ) : (
                  <p>Background already overriden.</p>
                )}
              </>
            )}
          </BackgroundContext.Consumer>
        </label>
      </div>
      {gadgetToggle && (
        <div className="SettingsNode">
          <p>Screensaver Background</p>
          <select
            value={backgroundSelected}
            onChange={(event) => {
              setBackgroundSelected(event.target.value);
              props.setSettings((cur) => ({
                ...cur,
                background: event.target.value,
              }));
            }}
          >
            {afterDarkBackground.map((scrsvr, index) => (
              <option value={scrsvr} key={`${scrsvr}-${index}`}>
                {makeHumanName(scrsvr)}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default AfterDarkGadget;
