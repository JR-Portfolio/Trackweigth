import { useState } from "react";
import "../erno.css";

const AddDetails = () => {
  const [formData, setFormData] = useState([{}]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    setFormData({[e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    console.log("onSubmit - function");
    e.preventDefault();

    const today = new Date().toLocaleDateString("fi-FI");
    console.log("today:", today)
    console.log("formData:", formData)
    
    fetch("http://localhost:8000/Mitat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          pvm: today,
          paino: formData.paino,
          vyotaro: formData.vyotaro   
      }),
    })
      .then(() => {
        console.log("Uusi rekisteri luotu");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return (
    <div className="adder">
      <h1>8 viikon haaste</h1>

      <form>
        <input
          type="number"
          name="vyotaro"
          onChange={handleChange}
          placeholder="vyotaro"
          value = {formData.vyotaro}
        />
        <input
          type="number"
          name="paino"
          onChange={handleChange}
          placeholder="paino"
          value = {formData.paino}
        />
        <button onClick={onSubmit}>Lisaa data</button>
      </form>
    </div>
  );
};

export default AddDetails;
