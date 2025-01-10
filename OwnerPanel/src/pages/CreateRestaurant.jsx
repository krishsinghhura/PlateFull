import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CreateRestaurant = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const address = e.target.address.value;
    const contact = e.target.contact.value;

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

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v2/restaurant-profile",
        {
          userid,
          name,
          address,
          contact,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );

      setSuccess("Restaurant profile created successfully!");
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create restaurant profile. Please try again.");
      setSuccess("");
      console.error(err);
    }
  };
  const handleCreateRestaurant = () => {
    navigate("/dashboard"); // Redirect to create restaurant page
  };

  return (
    <div className="bg-gray-100">
      <button
        onClick={handleCreateRestaurant}
        className="w-30 mt-4 ml-4 py-2 px-4 bg-transparenrt border-solid border-2 border-gray-500 font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        X
      </button>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Restaurant
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter restaurant name"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter address"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact"
                className="block text-sm font-semibold text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter contact number"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
