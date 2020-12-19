import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import '../css/SettingsPanel.css';
import { Background } from '../hooks/useBackground';
import compressImage from '../lib/compressImage';
import { Gadgets } from '../hooks/useGadgets';
import React from 'react';
import { ReactComponent as FATimes } from '../svg/times.svg';

interface SettingsProps {
  background: Background;
  gadgets: Gadgets;
  selfState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPanel = ({ background, gadgets, selfState }: SettingsProps) => {
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
    <div className="SettingsPanelBar">
      <p className="PanelName">Settings Panel</p>
      <button
        className="CloseButton"
        onClick={() => selfState(current => !current)}
      ><FATimes /></button>
    </div>
    <div className="SettingsPanelContent">
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

      <div className="SettingsCopyright">
        <p><strong>Copyright</strong></p>
        <div>Icons for Weather Gadget made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Weather Gadget uses the OpenWeatherMap API.</div>
        <div>Other icons (Wrench, Times) made by <a href="https://fontawesome.com/">FontAwesome</a></div>
        <div>Built with React and third-party modules. <a href="https://github.com/x-t/exhaust-fumes">Source code</a></div>
      </div>

    </div>
    </div>

  );
}

export default SettingsPanel;