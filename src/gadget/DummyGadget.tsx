import React, { useRef, useState } from "react";
import Draggable, { ControlPosition } from "react-draggable";
import { draggableGadget, GadgetProps } from "../lib/gadget";
import Switch from 'react-switch';

interface DummyGadgetSettings {
  enabled: boolean;
  offsets: ControlPosition;
}

export const DummyGadgetDefaults: DummyGadgetSettings = {
  enabled: false,
  offsets: {x: 100, y: 100},
}

const DummyGadget = (props: GadgetProps<DummyGadgetSettings>) => {
  const dummyGadgetRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={dummyGadgetRef}
      onStop={draggableGadget(dummyGadgetRef, props.setSettings)}
      scale={1}
      bounds="parent"
      defaultPosition={props.settings.offsets}
    >
      <div className="Gadget DummyGadget" ref={dummyGadgetRef}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis malesuada mi in ullamcorper. Donec luctus tempus lorem vel fringilla. Nam laoreet nunc ac molestie consectetur. Quisque facilisis diam eros, pretium mollis ante luctus vel. Donec luctus tristique sem nec volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ut tristique mi. Proin eu tortor vitae velit congue tincidunt ac ut diam. Nulla sed dignissim arcu.</p>
      </div>
    </Draggable>
  );
}

export const DummyGadgetSettingsNode = (props: GadgetProps<DummyGadgetSettings>) => {
  const [gadgetToggle, setGadgetToggle] = useState(props.settings.enabled);

  return (
    <div className="SettingsNode">
    <p>Enable Dummy Gadget</p>
    <label>
      <Switch
        checked={gadgetToggle}
        onChange={() => {
          setGadgetToggle(cur => !cur);
          props.setSettings(cur => ({
            ...cur,
            enabled: !cur.enabled,
          }))
        }}
        className="DummyGadgetSwitch"
        height={25}
        width={50}
      />
    </label>
  </div>
  );
}

export default DummyGadget;