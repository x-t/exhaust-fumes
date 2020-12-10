import { useEffect } from 'react';
import '../css/Background.css';
import { Background } from '../hooks/useBackground';

interface BackgroundProps {
  background: Background;
}

const BackgroundImage = ({ background }: BackgroundProps) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-opacity", background.values.opacity.toString()
    );

    document.documentElement.style.setProperty(
      "--background-color", background.values.color
    );
  }, [background.values.color, background.values.opacity]);

  return (
    <div
      className="BackgroundImage"
      style={{ 
        backgroundImage: `url('${background.values.data}')`,
        display: 'initial'
      }}
    />
  );
};

export default BackgroundImage;