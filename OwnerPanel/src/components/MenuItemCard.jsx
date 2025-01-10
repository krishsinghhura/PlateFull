import React from "react";
import "./card.css";

const MenuCard = ({ menuItems }) => {
  return (
    <div className="menu-card-container">
      {menuItems.map((item) => (
        <div key={item._id} className="menu-card">
          <div className="menu-card-title">
            <h3>{item.title}</h3>
          </div>
          <div className="menu-card-description">
            <p>{item.description}</p>
          </div>
          <div className="menu-card-price">
            <p>Price: ₹{item.price}</p>
          </div>
          <div className="menu-card-category">
            <p>Category: {item.category}</p>
          </div>
          <div className="menu-card-image">
            {/* Displaying a placeholder if the image is null */}
            {item.image ? (
              <img src={item.image} alt={item.title} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuCard;
