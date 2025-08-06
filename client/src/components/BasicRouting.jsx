import React from "react";
import { Routes, Route } from "react-router";
import Signin from "../pages/authentication/Signin";
import Dashboard from "../pages/Dashboard";

// Routing component redirects attempts to access the default path and dashboard path to either display the dashboard component or the register component depending on whether or not the user is logged in. The path to register will always display the register component.

export default function BasicRouting() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signin" element={<Signin />} />{" "}
    </Routes>
  );
}
