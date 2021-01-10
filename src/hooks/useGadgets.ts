// import DummyGadget, {
//   DummyGadgetDefaults,
//   DummyGadgetSettingsNode,
// } from "../gadget/DummyGadget";
// import CounterGadget, {
//   CounterGadgetDefaults,
//   CounterGadgetSettingsNode,
// } from "../gadget/CounterGadget";
import WeatherGadget, {
  WeatherGadgetDefaults,
  WeatherGadgetSettingsNode,
} from "../gadget/WeatherGadget";
import useStickyState from "./useStickyState";
import AfterDarkGadget, {
  AfterDarkGadgetDefaults,
  AfterDarkGadgetSettingsNode,
} from "../gadget/AfterDarkGadget";

export interface Gadgets {
  [key: string]: {
    node: React.ReactNode;
    state: [any, React.Dispatch<React.SetStateAction<any>>];
    settingsNode: React.ReactNode;
  };
}

const useGadgets = (): Gadgets => {
  return {
    WeatherGadget: {
      node: WeatherGadget,
      state: useStickyState(WeatherGadgetDefaults, "WeatherGadgetSettings"),
      settingsNode: WeatherGadgetSettingsNode,
    },
    AfterDarkGadget: {
      node: AfterDarkGadget,
      state: useStickyState(AfterDarkGadgetDefaults, "AfterDarkGadgetSettings"),
      settingsNode: AfterDarkGadgetSettingsNode,
    },
  };
};

export default useGadgets;
