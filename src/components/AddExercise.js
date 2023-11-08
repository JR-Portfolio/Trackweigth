import React, { useState } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";
import { postFetch } from "../common/utils";

const AddExercise = () => {
  const [harjoitus, setHarjoitus] = useState();
  const [kommentti, setKommentti] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    postFetch("http://localhost:8000/Harjoitus", harjoitus, kommentti);
  };

  return (
    <>
      <div className="main">
        <button className="main-button" onClick={() => navigate("/")}>
          Pääsivu
        </button>
        <h1 className="main-otsikko">Lisää harjoitus</h1>
        <form className="adder--form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Harjoitus"
            onChange={(e) => setHarjoitus(e.target.value)}
          />
          <textarea
            placeholder="Kommentti"
            onChange={(e) => setKommentti(e.target.value)}
          />

          <button type="submit">Lähetä</button>
        </form>
      </div>
    </>
  );
};

export default AddExercise;
