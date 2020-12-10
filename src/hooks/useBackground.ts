import useStickyState from "./useStickyState";

export interface Background {
  values: {
    opacity: number;
    color: string;
    data: string;
  };

  set: {
    opacity: React.Dispatch<any>;
    color: React.Dispatch<any>;
    data: React.Dispatch<any>;
  }
}

const useBackground = (): Background => {
  const [bgOpacity, setBgOpacity] = useStickyState(40, 'bgOpacity');
  const [bgColor, setBgColor] = useStickyState("#ffffff", 'bgColor');
  const [bgData, setBgData] = useStickyState("img/default.jpg", 'bgData');

  return {
      values: {
        opacity: bgOpacity,
        color: bgColor,
        data: bgData
      },
      set: {
        opacity: setBgOpacity,
        color: setBgColor,
        data: setBgData
      }
    };
}

export default useBackground;