import React, { useState, useEffect } from "react";
import GiftItem from "./GiftItem";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../firebase/firebase-config"; // Asegúrate de ajustar esta ruta según la estructura de tu proyecto

function GiftList() {
  const [gifts, setGifts] = useState([]);
  const db = getFirestore(app);

  // Definición de fetchGifts dentro de GiftList para cargar datos desde Firestore
  const fetchGifts = async () => {
    const querySnapshot = await getDocs(collection(db, "gifts"));
    const giftsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGifts(giftsArray);
  };

  // Cargar los regalos desde Firestore al montar el componente
  useEffect(() => {
    fetchGifts();
  }, []);

  // Actualizar la cantidad de un regalo seleccionado en Firestore y recargar los regalos
  const handleGiftSelect = async (selectedId) => {
    const giftRef = doc(db, "gifts", selectedId);
    const selectedGift = gifts.find((gift) => gift.id === selectedId);
    if (selectedGift && selectedGift.quantity > 0) {
      await updateDoc(giftRef, {
        quantity: selectedGift.quantity - 1,
      });
      fetchGifts(); // Refrescar la lista de regalos después de la actualización
    }
  };

  // Incrementar la cantidad de un regalo deseleccionado en Firestore y recargar los regalos
  const handleGiftDeselect = async (selectedId) => {
    const giftRef = doc(db, "gifts", selectedId);
    const selectedGift = gifts.find((gift) => gift.id === selectedId);

    // Esta es una nueva lógica simplificada que solo incrementa la cantidad si es menor que un límite máximo.
    // Este límite podría ser una constante predefinida o incluso podría omitirse si decides no tener un límite máximo.
    if (selectedGift) {
      const newQuantity = selectedGift.quantity + 1;
      await updateDoc(giftRef, {
        quantity: newQuantity,
      });
      fetchGifts(); // Refrescar la lista de regalos después de la actualización
    }
  };

  return (
    <div className="gift-list">
      {gifts.map((gift) => (
        <GiftItem
          key={gift.id}
          gift={gift}
          onGiftSelect={handleGiftSelect}
          onGiftDeselect={handleGiftDeselect}
        />
      ))}
    </div>
  );
}

export default GiftList;
