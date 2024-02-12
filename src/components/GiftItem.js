import React from "react";
import Button from "react-bootstrap/Button";
import { BsTrash } from "react-icons/bs";
import { useAuth } from "../context/AuthContext"; // Asegúrate de ajustar la ruta a tu estructura de archivos

function GiftItem({ gift, onGiftSelect, onGiftDeselect }) {
  const { isRegistered } = useAuth(); // Utiliza el contexto de autenticación aquí

  const handleSelect = () => {
    if (!isRegistered) {
      alert("Debes estar registrado para poder seleccionar regalos.");
      return;
    }
    onGiftSelect(gift.id);
  };

  const handleDeselect = () => {
    if (!isRegistered) {
      alert("Debes estar registrado para poder deseleccionar regalos.");
      return;
    }
    onGiftDeselect(gift.id);
  };

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
          Precio: ${gift.price}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Button
            data-testid="removeGiftBtn"
            onClick={handleDeselect}
            variant="danger"
            className="me-2"
            disabled={!isRegistered} // Los botones están condicionalmente deshabilitados basados en isRegistered
          >
            <BsTrash />
          </Button>
          <Button
            data-testid="selectGiftBtn"
            onClick={handleSelect}
            variant="primary"
            disabled={!isRegistered} // Los botones están condicionalmente deshabilitados basados en isRegistered
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
