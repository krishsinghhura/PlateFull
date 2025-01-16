import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data using Axios
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v2/menu/677eb2f2eb2c500337d9a472"
        );
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <p className="text-2xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-gray-800 text-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold">Restaurant Menu</h1>
        <p className="text-sm text-gray-300">
          Owner ID: 677eb2f2eb2c500337d9a472
        </p>
      </header>

      <main className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Menu Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="italic text-gray-500 mt-2">{item.category}</p>
              <p className="text-lg font-semibold text-gray-700 mt-4">
                ₹{item.price}
              </p>
              {item.isAvailable ? (
                <p className="text-green-500 font-medium mt-2">Available</p>
              ) : (
                <p className="text-red-500 font-medium mt-2">Out of Stock</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
