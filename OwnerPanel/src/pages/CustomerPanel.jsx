import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams

const CustomerPanel = () => {
  const { ownerId } = useParams(); // Get ownerId from the URL params
  const [data, setData] = useState([]);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!ownerId) {
        setError(new Error("Owner ID not provided"));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/v2/menu/${ownerId}`
        );
        setData(response.data);

        // Extract owner details from the first item
        if (response.data.length > 0) {
          setOwner(response.data[0].owner);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [ownerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Owner Details */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Owner Details</h1>
        {owner ? (
          <>
            <p>
              <span className="font-semibold text-gray-700">
                Name of the owner:
              </span>{" "}
              {owner.name}
            </p>
          </>
        ) : (
          <p className="text-gray-600">No owner details available.</p>
        )}
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu Items</h2>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title || "Menu Item"}
                  className="w-full h-32 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title || "Untitled Item"}
                </h3>
                <p className="text-gray-600">
                  {item.description || "No description available."}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Price:</span> ₹
                  {item.price || 0}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerPanel;
