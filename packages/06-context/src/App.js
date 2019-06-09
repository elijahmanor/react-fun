import React from "react";
import Tablar from "./Tablar";
import { SettingsProvider } from "./SettingsContext";

import "./App.css";

function App() {
  return (
    <SettingsProvider>
      <Tablar />
    </SettingsProvider>
  );
}

export default App;
