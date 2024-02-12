import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GiftList from "./components/GiftList";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <header className="App-header">
            <h1 data-testid="pageTitle">WeddGiftList</h1>
            <nav>{}</nav>
          </header>
          <Routes>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gifts" element={<GiftList />} />
            {}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
