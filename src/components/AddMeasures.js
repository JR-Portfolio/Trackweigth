import React, { useState } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";
import { postFetch } from "../common/utils";

const AddMeasures = () => {
  const [vyotaro, setVyotaro] = useState();
  const [paino, setPaino] = useState();
  const [kommentti, setKommentti] = useState("");
  const navigate = useNavigate();


  const onSubmit = (e) => {
    e.preventDefault(); 
    postFetch("http://localhost:8000/Mitat", paino, vyotaro, kommentti)
  };

  return (
    <>
      <div className="main">
        <button className="main-button" onClick={() => navigate("/")}>
          Pääsivu
        </button>
        <h1 className="main-otsikko">Lisää mitat</h1>
        <form className="adder--form">
          <input
            type="number"
            name="paino"
            onChange={(e) => setPaino(e.target.value)}
            placeholder="paino"
            value={paino}
          />

          <input
            type="number"
            name="vyotaro"
            onChange={(e) => setVyotaro(e.target.value)}
            placeholder="vyotaro"
            value={vyotaro}
          />
          <textarea onChange={(e) => setKommentti(e.target.value)} />

          <button onClick={onSubmit}>Lisaa data</button>
        </form>
      </div>
    </>
  );
};

export default AddMeasures;
