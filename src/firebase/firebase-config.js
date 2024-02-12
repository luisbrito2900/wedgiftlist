import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsBPba5Epc4dWden0jAlND6Cgz4VnVZx8",
  authDomain: "weddgiftlist.firebaseapp.com",
  projectId: "weddgiftlist",
  storageBucket: "weddgiftlist.appspot.com",
  messagingSenderId: "548075022479",
  appId: "1:548075022479:web:945d6b5b8287470c0be8fa",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
