import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import DashBoard from "./pages/Dashboard";
import CreateRestaurant from "./pages/CreateRestaurant";
import CreateMenu from "./pages/CreateMenu";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-restaurant" element={<CreateRestaurant />} />
        <Route path="/create-menuitem" element={<CreateMenu />} />
      </Routes>
    </>
  );
}

export default App;
