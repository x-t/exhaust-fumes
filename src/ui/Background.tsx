import { useEffect } from 'react';
import './Background.css';

interface BgProps {
  img: string;
  opacity: number;
}

function BackgroundImage(props: BgProps) {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-opacity", props.opacity.toString()
    );
  }, [props.opacity]);

  return (
    <div
      className="BackgroundImage"
      style={{ 
        backgroundImage: `url('${props.img}')`,
        display: 'initial'
      }}
    />
  );
}

export default BackgroundImage;