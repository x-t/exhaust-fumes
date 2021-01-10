import useStickyState from "./useStickyState";

/**
 * Yeah the name is comical. It's on purpose. I swear.
 */
export const useGadgetBackgroundOverride = () => {
  return useStickyState({ is: false, by: "" }, "isGadgetBackgroundOverride");
};
