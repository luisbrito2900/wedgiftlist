import React from "react";
import Button from "react-bootstrap/Button";
import { BsTrash } from "react-icons/bs";

function GiftItem({ gift, onGiftSelect, onGiftDeselect }) {
  return (
    <div className="gift-item card mb-3">
      <div className="card-header">
        <h3>{gift.name}</h3>
      </div>
      <div className="card-body">
        <img
          src={gift.imageUrl}
          alt={gift.name}
          className="card-img-top hover-image"
        />
        <p className="card-text">{gift.description}</p>
        {}
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {}
          <Button
            onClick={() => onGiftDeselect(gift.id)}
            variant="danger"
            className="me-2"
          >
            <BsTrash /> {}
          </Button>
          {}
          <Button
            data-testid="seleccionar-regalo-btn"
            onClick={() => onGiftSelect(gift.id)}
            variant="primary"
          >
            Seleccionar regalo
          </Button>
        </div>
      </div>
      <div className="card-footer">
        <p>Quedan: {gift.quantity}</p>
        {gift.quantity === 0 && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Agotado: Ya no quedan unidades disponibles.
          </p>
        )}
      </div>
    </div>
  );
}

export default GiftItem;
