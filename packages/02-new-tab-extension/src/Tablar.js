import React from "react";
import Background from "./Background";

import "./Tablar.css";

export default function Tablar() {
  const dateTime = new Date();
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
