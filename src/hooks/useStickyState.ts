import { SetStateAction, useEffect, useState } from "react";

/* Original JS code: 
https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/ */

/**
 * Returns a stateful value, based on localStorage, and a function to update it.
 * @param defaultValue Default value for the value
 * @param key Key used to get/set inside localStorage
 */
const useStickyState = <T extends unknown>(defaultValue: T, key: string): [T, React.Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    const stickyValue = localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useStickyState;