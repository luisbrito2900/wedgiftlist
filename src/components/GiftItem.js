import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function GiftItem({ gift, onGiftSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="gift-item card mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        <h3>{gift.name}</h3>
      </div>
      {isHovered && (
        <div className="card-body">
          <img
            src={gift.imageUrl}
            alt={gift.name}
            className="card-img-top hover-image"
          />
          <p className="card-text">{gift.description}</p>
          <Button onClick={() => onGiftSelect(gift.id)} variant="primary">
            Seleccionar regalo
          </Button>
        </div>
      )}
      <div className="card-footer">
        <p>Quedan: {gift.quantity}</p>
      </div>
    </div>
  );
}

export default GiftItem;
