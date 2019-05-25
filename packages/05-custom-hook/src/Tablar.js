import React, { useState, useEffect } from "react";
import Background from "./Background";
import "./Tablar.css";

export default function Tablar() {
  const [dateTime, setDateTime] = useState(new Date());

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
        <h1 className="Tablar-message">Hello, Workshop!</h1>
      </header>
    </Background>
  );
}
