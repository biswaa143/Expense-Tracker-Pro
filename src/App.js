import React from "react";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import MyExpenses from "./components/page/MyExpenses";
import Welcome from "./components/page/Welcome";
import Updateprofile from "./components/page/UpdateProfile";
import { ExpenseContextProvider } from "./components/store/expense-context";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/expenses" element={<MyExpenses />} />
        <Route path="/updateprofile" element={<Updateprofile />} />
      </Routes>
      <ExpenseContextProvider />
    </React.Fragment>
  );
};

export default App;
