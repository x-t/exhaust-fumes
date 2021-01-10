import React, { useEffect, useRef, useState } from "react";
import Draggable, { ControlPosition } from "react-draggable";
import { draggableGadget, GadgetProps } from "../lib/gadget";
import useStickyState from "../hooks/useStickyState";
import { Convert, OWMData } from "../lib/OWMData";
import Switch from "react-switch";
import { ReactComponent as IconCloudyDay } from "../svg/weather/cloudy_day.svg";
import { ReactComponent as IconFreezingRain } from "../svg/weather/freezing_rain.svg";
import { ReactComponent as IconDrizzleNight } from "../svg/weather/drizzle_night.svg";
import { ReactComponent as IconSnow } from "../svg/weather/snow.svg";
import { ReactComponent as IconClearNight } from "../svg/weather/clear_night.svg";
import { ReactComponent as IconCloudyNight } from "../svg/weather/cloudy_night.svg";
import { ReactComponent as IconThunderstorm } from "../svg/weather/thunderstorm.svg";
import { ReactComponent as IconScattered } from "../svg/weather/scattered.svg";
import { ReactComponent as IconBrokenOvercast } from "../svg/weather/broken_overcast.svg";
import { ReactComponent as IconRain } from "../svg/weather/rain.svg";
import { ReactComponent as IconMist } from "../svg/weather/mist.svg";
import { ReactComponent as IconClearDay } from "../svg/weather/clear_day.svg";
import { ReactComponent as IconDrizzleDay } from "../svg/weather/drizzle_day.svg";

interface WeatherGadgetSettings {
  enabled: boolean;
  offsets: ControlPosition;
  location: { city: string };
  lastQueried: number;
  OWMApiKey: string;
}

export const WeatherGadgetDefaults: WeatherGadgetSettings = {
  enabled: false,
  offsets: { x: 100, y: 100 },
  location: {
    city: "Vilnius",
  },
  lastQueried: 0,
  OWMApiKey: "130cca6072eca7ef643d64c6d3549c72",
};

const WeatherGadget = (props: GadgetProps<WeatherGadgetSettings>) => {
  const weatherGadgetRef = useRef<HTMLDivElement>(null);

  const [weather, setWeather] = useStickyState<OWMData | null>(
    null,
    "weatherGadgetDataWeather"
  );
  const [didFetch, setDidFetch] = useState(() => weather !== null);

  useEffect(() => {
    const curTime = Math.floor(Date.now() / 1000);

    if (
      !(props.settings.lastQueried + 60 >= curTime) ||
      weather === null ||
      weather.name !== props.settings.location.city ||
      !didFetch
    ) {
      setWeather(null);
      props.setSettings((current) => ({
        ...current,
        lastQueried: curTime,
      }));

      fetch(
        `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${props.settings.location.city}&appid=${props.settings.OWMApiKey}`
      )
        .then((x) => {
          if (!x.ok) throw new Error("Data");
          return x.text();
        })
        .then((x) => setWeather(Convert.toOWMData(x)))
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
        {didFetch ? (
          <>
            <div className="WeatherIcon">
              {getWeatherIcon(
                weather?.weather[0].id!,
                weather?.sys.sunrise!,
                weather?.sys.sunset!
              )}
            </div>
            <div className="WeatherData">
              <h1>{Math.round(weather?.main.temp!)} °C</h1>
              <p>
                {printWithPlus(Math.round(weather?.main.feels_like! * 10) / 10)}
              </p>
            </div>
          </>
        ) : (
          <p>Error fetching</p>
        )}
      </div>
    </Draggable>
  );
};

export const WeatherGadgetSettingsNode = (
  props: GadgetProps<WeatherGadgetSettings>
) => {
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
              setGadgetToggle((cur) => !cur);
              props.setSettings((cur) => ({
                ...cur,
                enabled: !cur.enabled,
              }));
            }}
            className="WeatherGadgetSwitch"
            height={25}
            width={50}
          />
        </label>
      </div>
      {gadgetToggle && (
        <>
          <div className="SettingsNode">
            <p>Location for weather</p>
            <input
              type="text"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                props.setSettings((current) => ({
                  ...current,
                  location: {
                    city: event.target.value,
                  },
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
                props.setSettings((current) => ({
                  ...current,
                  OWMApiKey: event.target.value,
                }));
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

const printWithPlus = (n: number): string => (n <= 0 ? "" : "+") + n;

const getWeatherIcon = (
  conditionCode: number,
  sunrise: number,
  sunset: number
) => {
  const curTime = Date.now() / 1000;
  const dayOrNight = curTime >= sunrise && curTime < sunset ? "day" : "night";

  if (conditionCode === 800)
    return dayOrNight === "day" ? <IconClearDay /> : <IconClearNight />;
  else if (conditionCode === 511) return <IconFreezingRain />;
  else if (conditionCode >= 200 && conditionCode <= 232)
    return <IconThunderstorm />;
  else if (conditionCode >= 300 && conditionCode <= 321)
    return dayOrNight === "day" ? <IconDrizzleDay /> : <IconDrizzleNight />;
  else if (conditionCode >= 500 && conditionCode <= 531) return <IconRain />;
  else if (conditionCode >= 600 && conditionCode <= 622) return <IconSnow />;
  else if (conditionCode >= 700 && conditionCode <= 781) return <IconMist />;
  else if (conditionCode === 801)
    return dayOrNight === "day" ? <IconCloudyDay /> : <IconCloudyNight />;
  else if (conditionCode === 802) return <IconScattered />;
  else if (conditionCode === 803 || conditionCode === 804)
    return <IconBrokenOvercast />;

  return null;
};

export default WeatherGadget;
