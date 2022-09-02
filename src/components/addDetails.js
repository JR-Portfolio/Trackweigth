import { useState } from "react";
import "../erno.css";
import DA from './dynamicTextArea'

const AddDetails = () => {
  //const [formData, setFormData] = useState({paino:"", vyotaro:""});
  const [vyotaro, setVyotaro] = useState();
  const [paino, setPaino] = useState();
  const [kommentti, setKommentti] = useState();
  const [error, setError] = useState("");

  /*
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    setFormData({[e.target.name]: e.target.value});
  };
  */

  const onSubmit = (e) => {
    console.log("onSubmit - function");
    e.preventDefault();
    //console.log('Vyotaro:',formData.vyotaro)
    const today = new Date().toLocaleDateString("fi-FI");
    console.log("today:", today)
    //console.log("formData:", formData)
    
    const data = {today, paino, vyotaro, kommentti}

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
    <div className="adder--header">
      <h1>8 viikon haaste</h1>

      <form className="adder--form">
      <input
          type="number"
          name="paino"
          onChange={(e) => setPaino(e.target.value)}
          placeholder="paino"
          value = {paino}
        />

        <input 
          type="number"
          name="vyotaro"
          onChange={(e) => setVyotaro(e.target.value)}
          placeholder="vyotaro"
          value = {vyotaro}
        />
        <DA onChange = {(e) => setKommentti(e.target.value)}/>
        
        <button onClick={onSubmit}>Lisaa data</button>
      </form>
    </div>
  );
};

export default AddDetails;
