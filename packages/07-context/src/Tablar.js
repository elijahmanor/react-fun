import React, { useState, useEffect } from "react";
import Background from "./Background";
import Greeting from "./Greeting";
import { useLocalStorage } from "./customHooks";
import { useSettings } from "./SettingsContext";
import { useHotkeys } from "react-hotkeys-hook";

import "./Tablar.css";

export default function Tablar() {
  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useLocalStorage("name", "");
  const [isDarkMode, toggleDarkMode] = useSettings();

  useEffect(() => {
    window.setInterval(() => {
      setDateTime(new Date());
    }, 60000);
  }, []);

  useHotkeys("ctrl+d", () => toggleDarkMode());

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  });
  const [hourMinute, amPm] = time.split(" ");

  return (
    <Background>
      <header
        className={`Tablar-header ${isDarkMode ? "Tablar-header--dark" : null}`}
      >
        <h1 className="Tablar-time">
          <span>{hourMinute}</span> <span>{amPm}</span>
        </h1>
        <Greeting name={name} onChange={name => setName(name)} />
      </header>
    </Background>
  );
}
