import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v2/users/677eb2f2eb2c500337d9a472"
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.error}>Error: {error.message}</p>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>{data?.restaurant?.name || "Restaurant"}</h1>
        <p style={styles.subtitle}>
          {data?.restaurant?.contact || "Contact Information"}
        </p>
        <p style={styles.subtitle}>{data?.restaurant?.address || "Address"}</p>
      </header>

      {/* Menu Section */}
      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>Menu</h2>
        <div style={styles.menuGrid}>
          {data?.menuItems?.map((item, index) => (
            <div key={index} style={styles.menuItem}>
              <h3 style={styles.itemTitle}>{item.title}</h3>
              <p style={styles.itemDescription}>{item.description}</p>
              <p style={styles.itemCategory}>{item.category}</p>
              <p style={styles.itemPrice}>₹{item.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5dc", // Beige
    color: "#4d0000", // Dark Maroon
    fontFamily: "'Orbitron', sans-serif",
  },
  header: {
    backgroundColor: "#660000", // Deep Maroon
    padding: "20px",
    textAlign: "center",
    color: "#d4af37", // Gold
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#f5f5dc", // Beige
    margin: "5px 0",
  },
  main: {
    padding: "20px",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#800000", // Rich Maroon
    marginBottom: "20px",
    fontWeight: "bold",
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  menuItem: {
    backgroundColor: "#f5eaea", // Light Maroon
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  itemTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#660000", // Deep Maroon
  },
  itemDescription: {
    fontSize: "0.9rem",
    color: "#4d0000", // Dark Maroon
    margin: "10px 0",
  },
  itemCategory: {
    fontStyle: "italic",
    color: "#800000", // Rich Maroon
  },
  itemPrice: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#d4af37", // Gold
    marginTop: "10px",
  },
  loading: {
    textAlign: "center",
    color: "#660000", // Deep Maroon
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "20px",
  },
  error: {
    textAlign: "center",
    color: "#ff0000", // Red for errors
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "20px",
  },
};

export default App;
