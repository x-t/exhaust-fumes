export interface GadgetProps<T> {
  settings: T;
  setSettings: React.Dispatch<React.SetStateAction<T>>;
}

export const draggableGadget = <T,>(ref: React.RefObject<HTMLDivElement>, setSettings: React.Dispatch<React.SetStateAction<T>>) => () => {
    const matrix = window.getComputedStyle(ref.current!).transform;
    const matrixArr = matrix.replace("matrix(", "").replace(")", "").split(", ");
    setSettings((current: T) => (
      {
        ...current,
        offsets:{
          x: parseInt(matrixArr[matrixArr.length - 2]),
          y: parseInt(matrixArr[matrixArr.length - 1]),
        }
      }
    ));
}