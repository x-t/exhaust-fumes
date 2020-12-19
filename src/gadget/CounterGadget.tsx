import React, { useRef, useState } from "react";
import Draggable, { ControlPosition } from "react-draggable";
import { draggableGadget, GadgetProps } from "../lib/gadget";
import Switch from 'react-switch';

interface CounterGadgetSettings {
  enabled: boolean;
  offsets: ControlPosition;
  count: number;
}

export const CounterGadgetDefaults: CounterGadgetSettings = {
  enabled: false,
  offsets: {x: 100, y: 100},
  count: 0,
}

const CounterGadget = (props: GadgetProps<CounterGadgetSettings>) => {
  const counterGadgetRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={counterGadgetRef}
      onStop={draggableGadget(counterGadgetRef, props.setSettings)}
      scale={1}
      bounds="parent"
      defaultPosition={props.settings.offsets}
    >
      <div className="Gadget StickyGadget" ref={counterGadgetRef}>
        <p>Count: {props.settings.count}</p>
        <p><button onClick={() => {
          props.setSettings((current) => ({
            ...current,
            count: ++current.count,
          }))
        }}>Increment</button></p>
        <p><button onClick={() => {
          props.setSettings((current) => ({
            ...current,
            count: 0,
          }))
        }}>Clear</button></p>
      </div>
    </Draggable>
  );
}

export const CounterGadgetSettingsNode = (props: GadgetProps<CounterGadgetSettings>) => {
  const [gadgetToggle, setGadgetToggle] = useState(props.settings.enabled);

  return (
    <div className="SettingsNode">
    <p>Enable Counter Gadget</p>
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
        className="StickyGadgetSwitch"
        height={25}
        width={50}
      />
    </label>
  </div>
  );
}

export default CounterGadget;