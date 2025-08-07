import React, { useState, useEffect, createContext } from "react";
import BasicRouting from "./components/BasicRouting";
import { BrowserRouter } from "react-router";

// enstanciate createContext and allow it to be used in children components
export const AuthorizationContext = createContext();

export default function App() {
  // as per the readme's suggestion, token functionality is stored in App.jsx so all children components can access it
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <AuthorizationContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <BasicRouting />
        {/* Sanity Check */}
      </BrowserRouter>
    </AuthorizationContext.Provider>
  );
}
