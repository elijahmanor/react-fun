import React, { useState, useEffect } from "react";
import Background from "./Background";
import Greeting from "./Greeting";

import "./Tablar.css";
import { useLocalStorage } from "./customHooks";

export default function Tablar() {
  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useLocalStorage("name", "");

  useEffect(() => {
    window.setInterval(() => {
      setDateTime(new Date());
    }, 60000);
  }, []);

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  });
  const [hourMinute, amPm] = time.split(" ");

  return (
    <Background>
      <header className="Tablar-header">
        <h1 className="Tablar-time">
          <span>{hourMinute}</span> <span>{amPm}</span>
        </h1>
        <Greeting name={name} onChange={name => setName(name)} />
      </header>
    </Background>
  );
}
