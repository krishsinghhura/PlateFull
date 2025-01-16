import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import MenuCard from "./MenuItemCard"; // Import MenuCard

const MenuItemsList = () => {
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]); // Initialize menuItems with an empty array

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    let userid;
    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      userid = decodedToken.userid;
    } catch (err) {
      setError("Invalid token. Please log in again.");
      console.error(err);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v2/users/${userid}`
        );
        setMenuItems(response.data.menuItems); // Extract menuItems from the response and update state
      } catch (e) {
        setError("Check your network and please try again.");
        console.error(e);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (menuItems.length === 0) return <div>Loading...</div>;

  return (
    <div className="mt-10 ml-10">
      <MenuCard menuItems={menuItems} />
    </div>
  );
};

export default MenuItemsList;
