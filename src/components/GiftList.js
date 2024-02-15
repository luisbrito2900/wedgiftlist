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
import logoPopular from "../images/bancopopular.png";
import logoBHD from "../images/bhd.jpg";
import logoBanreservas from "../images/banreservas.png";

function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

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

  const handleLogoutPrompt = () => {
    setShowLogoutConfirmModal(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setShowLogoutConfirmModal(false);
    }
  };

  return (
    <div className="gift-list-container">
      <div className="message-box form-container" id="weddgiftlistcontainer">
        <p className="message-box form-container text-justify main-text">
          Bienvenidos (as) a la lista de regalos para la boda de Luis y Perla.
          Su presencia en nuestra boda es uno de los mejores regalos que
          podríamos recibir, pero si desea hacernos un regalo apreciaríamos
          mucho su contribución para ayudarnos a comenzar esta nueva etapa
          juntos. Por ende, un poco mas abajo, se encuentran los artículos que
          complementan la lista de regalos, los mismos se encuentran en Plaza
          Lama, en caso de no poder ir hasta el lugar para adquirirlos, puede
          hacerle una transferencia a los novios del monto total del articulo
          seleccionado y en caso de adquirirlos, por favor hacerlo llegar a los
          novios con anterioridad a la boda.
        </p>
        <p className="message-box form-container text-justify main-text seccond-text">
          Ya sea que decida hacer transferencia de efectivo o comprar el regalo
          en la tienda, por favor asegurese de seleccionar el regalo y confirmar
          su elección en la lista de regalos que se encuentra debajo.
        </p>
        <p
          style={{ textAlign: "center " }}
          className="text-justify datos-nombre"
        >
          Datos para la transferencia:
        </p>

        <div
          className="message-box form-container"
          style={{ textAlign: "center" }}
          x
          id="nameandidcontainer"
        >
          <p>Nombre: Luis Jahziel Brito</p>
          <p className="cedula">Cédula: 402-1956172-3</p>
        </div>

        <div
          className="message-box form-container cuenta-container"
          id="popularaccount"
        >
          <div className="centered-content">
            <img
              src={logoPopular}
              alt="Banco Popular"
              style={{ width: "50px" }}
            />
          </div>

          <p style={{ textAlign: "center " }}>Cuenta de ahorro</p>
          <p className="account-number" style={{ textAlign: "center " }}>
            Numero de cuenta: 824671333
          </p>
        </div>

        <div
          className="message-box form-container cuenta-container"
          id="bhdaccount"
        >
          <div className="centered-content">
            <img src={logoBHD} alt="Banco BHD" style={{ width: "50px" }} />
          </div>

          <p style={{ textAlign: "center " }}>Cuenta de ahorro</p>
          <p className="account-number" style={{ textAlign: "center " }}>
            Numero de cuenta: 29766160023
          </p>
        </div>

        <div
          className="message-box form-container cuenta-container"
          id="banreservasaccount"
        >
          <div className="centered-content">
            <img
              src={logoBanreservas}
              alt="Banreservas"
              style={{ width: "50px" }}
            />
          </div>

          <p style={{ textAlign: "center " }}>Cuenta de ahorro</p>
          <p className="account-number" style={{ textAlign: "center " }}>
            Numero de cuenta: 9601925363
          </p>
        </div>
      </div>
      <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
        RECUERDE, ESTOS ARTICULOS ESTAN DISPONIBLES EN PLAZA LAMA.
      </p>
      <h1 className="gift-list-title">Lista de Regalos</h1>
      <div className="logout-container">
        {currentUser && (
          <button onClick={handleLogoutPrompt} className="logout-button">
            Cerrar sesión
          </button>
        )}
      </div>

      <Modal
        show={showLogoutConfirmModal}
        onHide={() => setShowLogoutConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar cierre de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas salir?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogoutConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
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
