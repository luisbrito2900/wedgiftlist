import React, { useState, useEffect } from "react";
import GiftItem from "./GiftItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase-config";
import { useAuth } from "../context/AuthContext";

function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState(null);
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

  const handleGiftSelect = async () => {
    if (selectedGiftId) {
      const giftRef = doc(db, "gifts", selectedGiftId);
      const selectedGift = gifts.find((gift) => gift.id === selectedGiftId);
      const user = auth.currentUser;

      if (selectedGift && selectedGift.quantity > 0 && user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const userName = userDoc.exists()
          ? userDoc.data().name
          : "Usuario Desconocido";

        await updateDoc(giftRef, { quantity: selectedGift.quantity - 1 });

        await addDoc(collection(db, "selecciones"), {
          userId: user.uid,
          userName: userName,
          giftId: selectedGiftId,
          giftName: selectedGift.name,
          timestamp: Timestamp.now(),
        });

        setShowModal(false);
        fetchGifts();
      }
    }
  };

  const openModal = (giftId) => {
    setSelectedGiftId(giftId);
    setShowModal(true);
  };

  const handleLogout = async () => {
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
            onOpenModal={() => openModal(gift.id)}
          />
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar selección</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que quieres seleccionar este regalo? Esta acción no se
          puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGiftSelect}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GiftList;
