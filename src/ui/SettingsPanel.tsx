import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import '../css/SettingsPanel.css';
import { Background } from '../hooks/useBackground';
import compressImage from '../lib/compressImage';

interface SettingsProps {
  background: Background;
}

function SettingsPanel(props: SettingsProps) {
  let [opacitySliderState, setOpacitySliderState] = useState(props.background.values.opacity);
  let [colorPickerState, setColorPickerState] = useState(props.background.values.color);

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
            props.background.set.opacity(parseInt(e.target.value));
          }}
        />
      </div>

      <div className="SettingsNode">
        <p>Background Color</p>
        <HexColorPicker 
          color={colorPickerState}
          onChange={(color) => {
            setColorPickerState(color);
            props.background.set.color(color);
          }}
        />
      </div>

      <div className="SettingsNode">
        <p>Background Image</p>
        <input 
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const imageString = await compressImage(e);
            props.background.set.data(imageString!)
          }}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;