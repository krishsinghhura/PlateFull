import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import MenuItemsList from "../components/MenuItemList";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleCreateRestaurant = () => {
    navigate("/create-restaurant"); // Redirect to create restaurant page
  };

  const handleCreateMenuItem = () => {
    navigate("/create-menuitem");
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
