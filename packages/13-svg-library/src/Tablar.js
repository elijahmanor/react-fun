import React, { useState, useEffect } from "react";
import Background from "./Background";
import Greeting from "./Greeting";
import { useSettings } from "./SettingsContext";
import { useHotkeys } from "react-hotkeys-hook";
import { Dialog } from "@reach/dialog";
import TicTacToe from "./TicTacToe";
import { IconLibrary, Icon } from "./Icon";
import "@reach/dialog/styles.css";
import "./Tablar.css";

export default function Tablar() {
  const [dateTime, setDateTime] = useState(new Date());
  const { name, isDarkMode, toggleDarkMode, dispatch } = useSettings();
  const [showTicTacToe, toggleTicTacToe] = useState(false);

  useEffect(() => {
    window.setInterval(() => {
      setDateTime(new Date());
    }, 60000);
  }, []);

  useHotkeys("ctrl+d", () => toggleDarkMode());
  useHotkeys("ctrl+t", () => toggleTicTacToe(true));

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  });
  const [hourMinute, amPm] = time.split(" ");

  return (
    <Background>
      <button className="tr" onClick={() => toggleTicTacToe(true)}>
        <Icon type="ticTacToe" title="Tic Tac Toe" width="1rem" height="1rem" />
      </button>
      <header
        className={`mm Tablar-header ${
          isDarkMode ? "Tablar-header--dark" : null
        }`}
      >
        <h1 className="Tablar-time">
          <span>{hourMinute}</span> <span>{amPm}</span>
        </h1>
        <Greeting
          name={name}
          onChange={name => dispatch({ type: "SET_NAME", name })}
        />
      </header>
      <button className="bl">
        <Icon type="settings" title="Settings" width="1rem" height="1rem" />
      </button>
      <button
        className="br"
        onClick={() => dispatch({ type: "RESET_BACKGROUND_URL" })}
      >
        <Icon
          type="refresh"
          title="Change Background"
          width="1rem"
          height="1rem"
        />
      </button>
      <Dialog isOpen={showTicTacToe} onDismiss={() => toggleTicTacToe(false)}>
        <TicTacToe />
      </Dialog>
      <IconLibrary />
    </Background>
  );
}
