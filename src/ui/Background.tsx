import { useContext, useEffect } from "react";
import "../css/Background.css";
import { Background } from "../hooks/useBackground";
import { BackgroundContext } from "./BackgroundContext";

interface BackgroundProps {
  background: Background;
}

const BackgroundImage = ({ background }: BackgroundProps) => {
  const { isOverriden } = useContext(BackgroundContext);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-opacity",
      background.values.opacity.toString()
    );

    document.documentElement.style.setProperty(
      "--background-color",
      background.values.color
    );
  }, [background.values.color, background.values.opacity]);

  // If the background is overriden by a gadget, we shouldn't render the default one.
  return !isOverriden ? (
    <div
      className="BackgroundImage"
      style={{
        backgroundImage: `url('${background.values.data}')`,
        display: "initial",
      }}
    />
  ) : (
    <></>
  );
};

export default BackgroundImage;
