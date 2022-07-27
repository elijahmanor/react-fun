import React, { useState, useEffect } from "react";
import Background from "./Background";
import Greeting from "./Greeting";
import { useSettings } from "./SettingsContext";
import { useHotkeys } from "react-hotkeys-hook";
import { Dialog } from "@reach/dialog";
import TicTacToe from "./TicTacToe";
import Timer from "./Timer";
import Rss from "./Rss";
import { IconLibrary, Icon } from "./Icon";
import "@reach/dialog/styles.css";
import "./Tablar.css";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

const dialogs = {
  ticTacToe: {
    Component: TicTacToe,
    props: {}
  },
  timer: {
    Component: Timer,
    props: {}
  },
  rss: {
    Component: Rss,
    props: { url: "https://www.reddit.com/r/reactjs/.rss" }
  }
};

export default function Tablar() {
  const [bookmarks, setBookmarks] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const { name, isDarkMode, toggleDarkMode, dispatch } = useSettings();
  const [currentDialog, setCurrentDialog] = useState(null);
  const { Component: CurrentDialog, props: dialogProps } = dialogs[
    currentDialog
  ]
    ? dialogs[currentDialog]
    : {};
  console.log(currentDialog, dialogProps);

  useEffect(() => {
    window.setInterval(() => {
      setDateTime(new Date());
    }, 60000);
  }, []);

  useEffect(() => {
	chrome.bookmarks.getTree((tree) => { // eslint-disable-line
	  setBookmarks(tree[0].children[0].children.slice(0, 10));
	});
  }, []);

  useHotkeys("ctrl+d", () => toggleDarkMode());
  useHotkeys("ctrl+t", () => setCurrentDialog("ticTacToe"));

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  });
  const [hourMinute, amPm] = time.split(" ");

  return (
    <Background>
      <button className="tl" onClick={() => setCurrentDialog("timer")}>
        <Icon type="timer" title="Timer" width="1rem" height="1rem" />
      </button>
		<Menu>
		  <MenuButton
			className="tm"
			style={{ fontSize: "1rem" }}
		  >
			Bookmarks <span aria-hidden>▾</span>
		  </MenuButton>
		  <MenuList>
			{ bookmarks.map(bookmark => <MenuItem onSelect={() => window.location.assign(bookmark.url)}>
				{ bookmark.title }
			</MenuItem>) }
		  </MenuList>
		</Menu>
      <button className="tr" onClick={() => setCurrentDialog("ticTacToe")}>
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
      <button
        className="bm"
        onClick={() => dispatch({ type: "RESET_BACKGROUND_URL" })}
      >
        <Icon
          type="refresh"
          title="Change Background"
          width="1rem"
          height="1rem"
        />
      </button>
      <button className="bl">
        <Icon type="settings" title="Settings" width="1rem" height="1rem" />
      </button>
      <button className="br" onClick={() => setCurrentDialog("rss")}>
        <Icon type="rss" title="RSS" width="1rem" height="1rem" />
      </button>
      <Dialog isOpen={!!currentDialog} onDismiss={() => setCurrentDialog(null)}>
        {!!CurrentDialog && <CurrentDialog {...dialogProps} />}
      </Dialog>
      <IconLibrary />
    </Background>
  );
}
