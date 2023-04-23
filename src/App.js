import React from "react";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/page/Welcome";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
