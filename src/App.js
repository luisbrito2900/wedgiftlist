import React from "react";
import "./App.css";
import GiftList from "./components/GiftList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="page-Title">Lista de regalos de boda</h1>
      </header>
      <GiftList />
    </div>
  );
}

export default App;
