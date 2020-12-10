import { useRef } from "react";

/**
 * Outputs the amount of times rendered inside console
 * @param scope Define component scope
 */
const useAmountRendered = (scope: string) => {
  const renders = useRef(0);
  console.log(`${scope} renders: ${renders.current++}`)
}

export default useAmountRendered;