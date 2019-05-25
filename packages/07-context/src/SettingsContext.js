import React from "react";
import useDarkMode from "use-dark-mode";

const SettingsContext = React.createContext();

function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
}

function SettingsProvider(props) {
  const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode(false);
  const value = React.useMemo(() => [isDarkMode, toggleDarkMode], [isDarkMode, toggleDarkMode]);
  return <SettingsContext.Provider value={value} {...props} />;
}

export { SettingsProvider, useSettings };
