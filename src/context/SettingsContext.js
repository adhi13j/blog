import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [baseURL, setBaseURL] = useState("https://4c78214ee304.ngrok-free.app"); // default

  return (
    <SettingsContext.Provider value={{ baseURL, setBaseURL }}>
      {children}
    </SettingsContext.Provider>
  );
};