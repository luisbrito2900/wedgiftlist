import React from "react";
import Button from "react-bootstrap/Button";

function GiftItem({ gift, onOpenModal }) {
  return (
    <div className="gift-item card mb-3">
      <div className="card-header">
        <h3 data-testid="giftName">{gift.name}</h3>
      </div>
      <div className="card-body">
        <img
          src={gift.imageUrl}
          alt={gift.name}
          className="card-img-top hover-image"
        />
        <p className="card-text" data-testid="price">
          Precio: RD${gift.price}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Button
            data-testid="selectGiftBtn"
            onClick={() => onOpenModal(gift.id)}
            variant="primary"
            disabled={gift.quantity === 0}
          >
            Seleccionar regalo
          </Button>
        </div>
      </div>
      <div className="card-footer">
        <p data-testid="remainingGifts">Quedan: {gift.quantity}</p>
        {gift.quantity === 0 && (
          <p
            data-testid="noRemainingGiftsMessage"
            style={{ color: "red", fontWeight: "bold" }}
          >
            Agotado: Ya no quedan unidades disponibles.
          </p>
        )}
      </div>
    </div>
  );
}

export default GiftItem;
