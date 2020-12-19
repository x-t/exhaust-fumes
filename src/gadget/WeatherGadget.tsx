import React, { useEffect, useRef, useState } from "react";
import Draggable, { ControlPosition } from "react-draggable";
import { draggableGadget, GadgetProps } from "../lib/gadget";
import useStickyState from "../hooks/useStickyState";
import { Convert, OWMData } from "../lib/OWMData";
import Switch from 'react-switch';

interface WeatherGadgetSettings {
  enabled: boolean;
  offsets: ControlPosition;
  location: {city: string};
  lastQueried: number;
  OWMApiKey: string;
}

export const WeatherGadgetDefaults: WeatherGadgetSettings = {
  enabled: false,
  offsets: {x: 100, y: 100},
  location: {
    city: "Vilnius"
  },
  lastQueried: 0,
  OWMApiKey: "130cca6072eca7ef643d64c6d3549c72",
}

const WeatherGadget = (props: GadgetProps<WeatherGadgetSettings>) => {
  const weatherGadgetRef = useRef<HTMLDivElement>(null);

  const [weather, setWeather] = useStickyState<OWMData | null>(null, 'weatherGadgetDataWeather');
  const [didFetch, setDidFetch] = useState(() => weather !== null);
  
  useEffect(() => {
    const curTime = Math.floor(Date.now() / 1000);
  
    if (!(props.settings.lastQueried + 60 >= curTime)
      || weather === null
      || weather.name !== props.settings.location.city
      || !didFetch) {
      console.log("Fetching weather...");
      setWeather(null);
      props.setSettings(current => ({
        ...current,
        lastQueried: curTime,
      }))

      fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${props.settings.location.city}&appid=${props.settings.OWMApiKey}`)
        .then(x => {if (!x.ok) throw new Error("Data"); return x.text()})
        .then(x => setWeather(Convert.toOWMData(x)))
        .then(() => setDidFetch(true))
        .catch(() => {
          setDidFetch(false);
        });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.settings.location.city]);

  return (
    <Draggable
      nodeRef={weatherGadgetRef}
      onStop={draggableGadget(weatherGadgetRef, props.setSettings)}
      scale={1}
      bounds="parent"
      defaultPosition={props.settings.offsets}
    >
      <div className="Gadget WeatherGadget" ref={weatherGadgetRef}>
        { didFetch ?
        <>
        <p>{weather?.main.temp} °C</p>
        <p>Feels like {weather?.main.feels_like} °C</p>
        <p>{weather?.name}</p>
        </>
        : 
        <p>Error!</p>
        }
      </div>
    </Draggable>
  );
}

export const WeatherGadgetSettingsNode = (props: GadgetProps<WeatherGadgetSettings>) => {
  const [gadgetToggle, setGadgetToggle] = useState(props.settings.enabled);
  const [location, setLocation] = useState(props.settings.location.city);
  const [apiKey, setApiKey] = useState(props.settings.OWMApiKey);

  return (
    <>
    <div className="SettingsNode">
      <p>Enable Weather Gadget</p>
      <label>
        <Switch
          checked={gadgetToggle}
          onChange={() => {
            setGadgetToggle(cur => !cur);
            props.setSettings(cur => ({
              ...cur,
              enabled: !cur.enabled,
            }))
          }}
          className="WeatherGadgetSwitch"
          height={25}
          width={50}
        />
      </label>
    </div>

  <div className="SettingsNode">
    <p>Location for weather</p>
    <input 
      type="text"
      value={location}
      onChange={(event) => {
        setLocation(event.target.value);
        props.setSettings(current => ({
          ...current,
          location: {
            city: event.target.value
          }
        }));
      }}
    />
  </div>

  <div className="SettingsNode">
    <p>OpenWeatherMap API Key</p>
    <input 
      type="text"
      value={apiKey}
      onChange={(event) => {
        setApiKey(event.target.value);
        props.setSettings(current => ({
          ...current,
          OWMApiKey: event.target.value
        }));
      }}
    />
  </div>
  </>
  );
}

export default WeatherGadget;