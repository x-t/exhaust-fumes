import { useRef } from "react";

/**
 * Outputs the amount of times rendered inside console
 * @param scope Define component scope
 */
const useAmountRendered = (scope: string): number => {
  const renders = useRef(1);
  console.log(`${scope} renders: ${renders.current++}`);
  return renders.current;
}

export default useAmountRendered;