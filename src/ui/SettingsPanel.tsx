import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import '../css/SettingsPanel.css';
import { Background } from '../hooks/useBackground';
import compressImage from '../lib/compressImage';
import { Gadgets } from '../hooks/useGadgets';
import React from 'react';

interface SettingsProps {
  background: Background;
  gadgets: Gadgets;
}

const SettingsPanel = ({ background, gadgets }: SettingsProps) => {
  const renderGadgetsNodes = () => {
    return Object.entries(gadgets).map(([key, value]) => {
      const [state, setState] = value.state;
        return React.createElement(value.settingsNode as React.FunctionComponent,
              { settings: state,
                setSettings: setState,
                key: `${key}-SettingsNode`} as React.Attributes, null);
    })
  }
  
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
          value={background.values.opacity}
          onChange={(e) => {
            background.set.opacity(parseInt(e.target.value));
          }}
        />
      </div>

      <div className="SettingsNode">
        <p>Background Color</p>
        <HexColorPicker 
          color={background.values.color}
          onChange={(color) => {
            background.set.color(color);
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
            background.set.data(imageString!)
          }}
        />
      </div>

      {renderGadgetsNodes()}

    </div>

  );
}

export default SettingsPanel;