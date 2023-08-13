import React, { useState } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";
//import {dynamicTextArea} from './dynamicTextArea'

const AddObjectives = () => {
  const [week, setWeek] = useState();
  const [objective, setObjective] = useState();
  const [addInfo, setAddInfo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const onSubmit = (e) => {
    console.log("onSubmit - function");
    e.preventDefault();
    const today = new Date().toLocaleDateString("fi-FI");
    console.log("today:", today);
    console.log("addInfo:", addInfo);

    const data = { today, objective, week, addInfo };

    fetch("http://localhost:8000/Tavoitteet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log("Uusi tavoite luotu");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">Luo tavoite</h1>

      <form className="adder--form">
        <textarea
          name="objective"
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Tavoite"
          value={objective}
        />

        <input
          type="number"
          name="week"
          onChange={(e) => setWeek(e.target.value)}
          placeholder="Viikko"
          value={week}
        />
        <textarea onChange={(e) => setAddInfo(e.target.value)} />

        <button onClick={onSubmit}>Lisaa tavoite</button>
      </form>
    </div>
  );
};

export default AddObjectives;
