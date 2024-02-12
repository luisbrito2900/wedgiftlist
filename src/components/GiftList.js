import React, { useState, useEffect } from "react";
import GiftItem from "./GiftItem";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase-config";
import { useAuth } from "../context/AuthContext";

function GiftList() {
  const [gifts, setGifts] = useState([]);
  // const db = getFirestore(app);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const fetchGifts = async () => {
    const querySnapshot = await getDocs(collection(db, "gifts"));
    const giftsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGifts(giftsArray);
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      fetchGifts();
    }
  }, [currentUser, navigate, db]);

  const handleGiftSelect = async (selectedId) => {
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
    const giftRef = doc(db, "gifts", selectedId);
    const selectedGift = gifts.find((gift) => gift.id === selectedId);
    if (selectedGift && selectedGift.quantity < selectedGift.maxQuantity) {
      await updateDoc(giftRef, {
        quantity: selectedGift.quantity + 1,
      });
      fetchGifts();
    }
  };

  const handleLogout = async () => {
    // const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="gift-list-container">
      <h1 className="gift-list-title">Lista de Regalos</h1>
      {currentUser && (
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      )}
      <div className="gift-list">
        {gifts.map((gift) => (
          <GiftItem
            key={gift.id}
            gift={gift}
            onGiftSelect={() => handleGiftSelect(gift.id)}
            onGiftDeselect={() => handleGiftDeselect(gift.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default GiftList;
