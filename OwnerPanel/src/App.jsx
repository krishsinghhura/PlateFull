import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import LoginPage from "./pages/login";
import DashBoard from "./pages/Dashboard";
import CreateRestaurant from "./pages/CreateRestaurant";
import CreateMenu from "./pages/CreateMenu";
import CustomerPanel from "./pages/CustomerPanel";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve and decode the JWT from cookies
    const token = Cookies.get("token"); // Use the cookie name you stored the JWT with
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userid);
      } catch (err) {
        console.error("Invalid token", err);
        setUserId(null);
      }
    }
  }, []);

  return (
    <>
      <Routes>
        {/* Pass userId directly to CustomerPanel */}
        <Route path={`/menu/:ownerId`} element={<CustomerPanel />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-restaurant" element={<CreateRestaurant />} />
        <Route path="/create-menuitem" element={<CreateMenu />} />
      </Routes>
    </>
  );
}

export default App;
