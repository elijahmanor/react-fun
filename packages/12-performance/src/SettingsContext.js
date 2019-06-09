import React, { useMemo } from "react";
import useDarkMode from "use-dark-mode";
import { useReducerWithLocalStorage } from "./customHooks";

const SettingsContext = React.createContext();
const initialSettings = {
  name: "",
  collectionBackgroundUrl:
    "https://source.unsplash.com/collection/3802293/1600x900",
  cachedBackgroundUrl: ""
};

function settingsReducer(state, action) {
  switch (action.type) {
    case "SET_NAME": {
      return { ...state, name: action.name };
    }
    case "SET_BACKGROUND_URL": {
      return { ...state, cachedBackgroundUrl: action.backgroundUrl };
    }
    case "RESET_BACKGROUND_URL": {
      return { ...state, cachedBackgroundUrl: "" };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
}

function SettingsProvider(props) {
  const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode(false);
  const [state, dispatch] = useReducerWithLocalStorage(
    settingsReducer,
    "settings",
    initialSettings
  );
  const value = useMemo(
    () => ({ ...state, dispatch, isDarkMode, toggleDarkMode }),
    [state, dispatch, isDarkMode, toggleDarkMode]
  );

  return <SettingsContext.Provider value={value} {...props} />;
}

export { SettingsProvider, useSettings };
