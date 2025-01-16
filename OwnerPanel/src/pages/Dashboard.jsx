import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import MenuItemsList from "../components/MenuItemList";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve and decode the JWT from cookies
    const token = Cookies.get("token"); // Use the cookie name you stored the JWT with
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userid); // Adjust 'userId' based on your token structure
      } catch (err) {
        console.error("Invalid token", err);
        setUserId(null);
      }
    }
  }, []);
  const navigate = useNavigate();
  const handleCreateRestaurant = () => {
    navigate("/create-restaurant"); // Redirect to create restaurant page
  };

  const handleCreateMenuItem = () => {
    navigate("/create-menuitem");
  };

  const handleShowMenu = () => {
    navigate(`/menu/${userId}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex space-x-4 mt-4 ml-4 mr-4">
        <button
          onClick={handleCreateRestaurant}
          className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          style={{ flexBasis: "20%" }}
        >
          Create Restaurant
        </button>
        <button
          onClick={handleShowMenu}
          className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          style={{ flexBasis: "20%" }}
        >
          Show Menu
        </button>
        <button
          onClick={handleCreateMenuItem}
          className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 m-2"
          style={{ flexBasis: "80%" }}
        >
          Create New Menu Item
        </button>
      </div>

      <MenuItemsList />
    </>
  );
};

export default Dashboard;
