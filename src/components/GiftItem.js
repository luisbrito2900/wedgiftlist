import React, { useState } from "react";
import Button from "react-bootstrap/Button"; // Importar Button de React Bootstrap si lo estás utilizando

function GiftItem({ gift, onGiftSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="gift-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{gift.name}</h3>
      {isHovered && (
        <>
          <div>
            <img
              src={gift.imageUrl}
              alt={gift.name}
              className="card-img-top hover-image"
            />
            <p>{gift.description}</p>
          </div>
          <Button onClick={() => onGiftSelect(gift.id)} variant="primary">
            Seleccionar Regalo
          </Button>
        </>
      )}
      <p>Quedan: {gift.quantity}</p>
    </div>
  );
}

export default GiftItem;
