import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import '../css/SettingsPanel.css';

interface SettingsProps {
  opacity: number;
  color: string;
  setBgOpacity: React.Dispatch<React.SetStateAction<number>>;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setImageData: React.Dispatch<React.SetStateAction<string>>;
}

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
  const imageFile = event.target.files![0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  return new Promise(async (resolve) => {
    try {
      const compressedFile = imageCompression(imageFile, options);
  
      const reader = new FileReader();
      reader.readAsDataURL(await compressedFile);
      reader.onloadend = () => {
        resolve(reader.result as string);
      }
    } catch (error) {
      console.error(error);
    }
  })
}

function SettingsPanel(props: SettingsProps) {
  let [opacitySliderState, setOpacitySliderState] = useState(props.opacity);
  let [colorPickerState, setColorPickerState] = useState(props.color);

  return (
    <div className="SettingsPanel">
      <div className="SettingsNode">
        <p>Image Opacity</p>
        <input
          type="range"
          id="BackgroundOpacity"
          name="BackgroundOpacity"
          min={0}
          max={100}
          step={1}
          value={opacitySliderState}
          onChange={(e) => {
            setOpacitySliderState(parseInt(e.target.value));
            props.setBgOpacity(parseInt(e.target.value));
          }}
        />
      </div>

      <div className="SettingsNode">
        <p>Background Color</p>
        <HexColorPicker 
          color={colorPickerState}
          onChange={(color) => {
            setColorPickerState(color);
            props.setBgColor(color);
          }}
        />
      </div>

      <div className="SettingsNode">
        <p>Background Image</p>
        <input 
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageUpload(e).then((s) => {
              props.setImageData(s);
            });
          }}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;