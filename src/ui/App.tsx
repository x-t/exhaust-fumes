import { useState } from 'react';
import '../css/App.css';
import useBackground from '../hooks/useBackground';
import BackgroundImage from './Background';
import SettingsPanel from './SettingsPanel';
import { ReactComponent as FAWrench } from '../svg/wrench.svg';

function App() {
  const [openedSettings, setOpenSettings] = useState(false);
  const background = useBackground();

  return (
    <>
    <BackgroundImage
      background={background}
    />

    <div className="Gadgets"></div>

    { openedSettings && 
      <SettingsPanel
        background={background}
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
