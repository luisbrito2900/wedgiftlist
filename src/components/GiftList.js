import React, { useState, useEffect } from "react";
import GiftItem from "./GiftItem";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../firebase/firebase-config";

function GiftList({ isRegistered }) {
  const [gifts, setGifts] = useState([]);
  const db = getFirestore(app);

  const fetchGifts = async () => {
    const querySnapshot = await getDocs(collection(db, "gifts"));
    const giftsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGifts(giftsArray);
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handleGiftSelect = async (selectedId) => {
    if (!isRegistered) {
      alert("Debes estar registrado para seleccionar un regalo.");
      return;
    }
    const giftRef = doc(db, "gifts", selectedId);
    const selectedGift = gifts.find((gift) => gift.id === selectedId);
    if (selectedGift && selectedGift.quantity > 0) {
      await updateDoc(giftRef, {
        quantity: selectedGift.quantity - 1,
      });
      fetchGifts();
    }
  };

  const handleGiftDeselect = async (selectedId) => {
    if (!isRegistered) {
      alert("Debes estar registrado para deseleccionar un regalo.");
      return;
    }
    const giftRef = doc(db, "gifts", selectedId);
    const selectedGift = gifts.find((gift) => gift.id === selectedId);

    if (selectedGift) {
      const MAX_QUANTITY = selectedGift.maxQuantity || 10;
      const newQuantity =
        selectedGift.quantity < MAX_QUANTITY
          ? selectedGift.quantity + 1
          : MAX_QUANTITY;

      await updateDoc(giftRef, {
        quantity: newQuantity,
      });
      fetchGifts();
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
          isRegistered={isRegistered}
        />
      ))}
    </div>
  );
}

export default GiftList;
