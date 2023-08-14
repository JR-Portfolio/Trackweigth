import React, { useState } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";

const AddMeasures = () => {
  //const [formData, setFormData] = useState({paino:"", vyotaro:""});
  const [vyotaro, setVyotaro] = useState();
  const [paino, setPaino] = useState();
  const [kommentti, setKommentti] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const onSubmit = (e) => {
    console.log("onSubmit - function");
    e.preventDefault();
    const today = new Date().toLocaleDateString("fi-FI");
    console.log("today:", today);
    console.log("Kommentti:", kommentti);

    const data = { today, paino, vyotaro, kommentti };
    if (data.paino < 60 || data.paino > 100){
      console.error("Ei uskottavaa")
      alert("Paino määritys virheellinen")
      window.location.reload();
    }
    if (data.vyotaro < 70 || data.vyotaro > 120){
      console.error("Ei uskottavaa")
      alert("Vyötärö määritys virheellinen")
      window.location.reload();
    }

    fetch("http://localhost:8000/Mitat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log("Uusi rekisteri luotu");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
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
