import React, { useState } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";
import { postFetch } from "../common/utils";

const AddMeasures = () => {
  const [vyotaro, setVyotaro] = useState();
  const [paino, setPaino] = useState();
  const [lantio, setLantio] = useState();
  const [rinta, setRinta] = useState();
  const [kommentti, setKommentti] = useState("");
  const navigate = useNavigate();

  const data = {
    paino,
    vyotaro,
    lantio,
    rinta,
    kommentti,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postFetch("http://localhost:8000/Mitat", data);
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

          <input
            type="number"
            name="lantio"
            onChange={(e) => setLantio(e.target.value)}
            placeholder="lantio"
            value={lantio}
          />

          <input
            type="number"
            name="rinta"
            onChange={(e) => setRinta(e.target.value)}
            placeholder="rinta"
            value={rinta}
          />

          <textarea onChange={(e) => setKommentti(e.target.value)} />

          <button onClick={onSubmit}>Lisaa data</button>
        </form>
      </div>
    </>
  );
};

export default AddMeasures;
