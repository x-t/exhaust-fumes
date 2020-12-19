import { useState } from 'react';
import '../css/App.css';
import useBackground from '../hooks/useBackground';
import BackgroundImage from './Background';
import SettingsPanel from './SettingsPanel';
import { ReactComponent as FAWrench } from '../svg/wrench.svg';
import Gadgets from './Gadgets';
import useGadgets from '../hooks/useGadgets';

const App = () => {
  const [openedSettings, setOpenSettings] = useState(false);
  const background = useBackground();
  const gadgets = useGadgets();

  return (
    <>
    <BackgroundImage
      background={background}
    />

    <Gadgets
      gadgets={gadgets}
    />

    { openedSettings && 
      <SettingsPanel
        background={background}
        gadgets={gadgets}
      />
    }

    <div 
      className="SettingsBtn"
      style={{ width: '45px' }}
    >
      <button onClick={() => {
        setOpenSettings(!openedSettings);
      }}>
        <FAWrench />
      </button>
    </div>
    </>
  );
}

export default App;
