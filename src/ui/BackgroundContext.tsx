import React from "react";

interface BackgroundContextT {
  isOverriden: boolean;
  setOverride: React.Dispatch<
    React.SetStateAction<{ is: boolean; by: string }>
  > | null;
  overridenBy: string;
}

export const BackgroundContext = React.createContext<BackgroundContextT>({
  isOverriden: false,
  setOverride: null,
  overridenBy: "",
});
