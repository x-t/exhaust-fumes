import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import '../css/App.css';
import BackgroundImage from './Background';
import SettingsPanel from './SettingsPanel';

function App() {
  const [bgOpacity, setBgOpacity] = useState(40);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [openedSettings, setOpenSettings] = useState(false);
  const [imageData, setImageData] = useState("");
  const [cookies, setCookie] = useCookies(['bgOpacity', 'bgColor']);

  useEffect(() => {
    cookies.bgOpacity
      ? setBgOpacity(cookies.bgOpacity)
      : setCookie('bgOpacity', 40);

    cookies.bgColor
      ? setBgColor(cookies.bgColor)
      : setCookie('bgColor', '#ffffff');

    chrome.storage.local.get(['bgData'], (res) => {
      res.bgData
        ? setImageData(res.bgData)
        : setImageData('img/default.jpg');
    })

    document.documentElement.style.setProperty(
      "--background-color", cookies.bgColor
    );
  }, [cookies, setCookie]);

  return (
    <>
    <BackgroundImage
      img={imageData}
      opacity={bgOpacity}
    />

    <div className="App"></div>

    { openedSettings && 
      <SettingsPanel
        opacity={bgOpacity}
        color={bgColor}
        setBgOpacity={(opacity) => {
          setBgOpacity(opacity);
          setCookie('bgOpacity', opacity);
        }}
        setBgColor={(color) => {
          setBgColor(color);
          setCookie('bgColor', color);
        }}
        setImageData={(data) => {
          setImageData(data);
          chrome.storage.local.set({bgData: data});
        }}
      />
    }

    <div className="SettingsBtn">
      <button onClick={() => {
        setOpenSettings(!openedSettings);
      }}>
        Settings
      </button>
    </div>
    </>
  );
}

export default App;
