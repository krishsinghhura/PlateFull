import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import for jwtDecode

const CreateMenu = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const category = e.target.category.value;
    const image = e.target.image.files[0];

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
      const formData = new FormData();
      formData.append("userid", userid);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/v2/menu-items", // Adjust endpoint as per backend
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Menu item created successfully!");
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create menu item. Please try again.");
      setSuccess("");
      console.error(err);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard"); // Redirect to dashboard or previous page
  };

  return (
    <div className="bg-gray-100">
      <button
        onClick={handleGoBack}
        className="w-30 mt-4 ml-4 py-2 px-4 bg-transparent border-solid border-2 border-gray-500 font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        X
      </button>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Menu Item
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter menu item title"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter menu item description"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter price"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select category</option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                accept="image/*"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Create Menu Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
