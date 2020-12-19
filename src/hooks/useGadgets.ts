import DummyGadget, { DummyGadgetDefaults, DummyGadgetSettingsNode } from "../gadget/DummyGadget";
import CounterGadget, { CounterGadgetDefaults, CounterGadgetSettingsNode } from "../gadget/CounterGadget";
import WeatherGadget, { WeatherGadgetDefaults, WeatherGadgetSettingsNode } from "../gadget/WeatherGadget";
import useStickyState from "./useStickyState";

export interface Gadgets {
  [key: string]: {
    node: React.ReactNode;
    state: [any, React.Dispatch<React.SetStateAction<any>>];
    settingsNode: React.ReactNode;
  }
}

const useGadgets = (): Gadgets => {
  return {
    WeatherGadget: {
      node: WeatherGadget,
      state: useStickyState(WeatherGadgetDefaults, 'WeatherGadgetSettings'),
      settingsNode: WeatherGadgetSettingsNode
    },
    CounterGadget: {
      node: CounterGadget,
      state: useStickyState(CounterGadgetDefaults, 'CounterGadgetSettings'),
      settingsNode: CounterGadgetSettingsNode
    },
    DummyGadget: {
      node: DummyGadget,
      state: useStickyState(DummyGadgetDefaults, 'DummyGadgetSettings'),
      settingsNode: DummyGadgetSettingsNode
    },
  };
}

export default useGadgets;