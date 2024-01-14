import { useState } from "react";
import "../erno.css";
import DA from "./dynamicTextArea";
import { postFetch } from "../common/utils";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const [category, setCategory] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");
  const [plusCalories, setPlusCalories] = useState(0);
  const [lostCalories, setLostCalories] = useState(0);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString("fi-FI");

    const diff = plusCalories - lostCalories;

    const data = { today, category, receipt, plusCalories, lostCalories, diff };
    console.log("Adding food data: ", data);
    postFetch("http://localhost:8000/Safka", data);
    
  };

  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>

      <h1 className="main-otsikko">Aterian syöttö</h1>

      <form className="adder--form">
        <select
          name="tapahtuma"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Aamiainen">Aamiainen</option>
          <option value="Lounas">Lounas</option>
          <option value="Valipala">Välipala</option>
          <option value="Paivallinen">Päivällinen</option>
          <option value="Iltapala">Iltapala</option>
        </select>

        <textarea
          name="resepti"
          placeholder="Safka"
          onChange={(e) => setReceipt(e.target.value)}
        />
        <input
          type="number"
          placeholder="Saadut calorit"
          name="tulo"
          value={plusCalories}
          onChange={(e) => setPlusCalories(e.target.value)}
        />
        <input
          type="number"
          name="meno"
          placeholder="Liikunta calorit"
          value={lostCalories}
          onChange={(e) => setLostCalories(e.target.value)}
        />

        <button onClick={onSubmit}>Luo recordi</button>
      </form>
      {error && error}
    </div>
  );
};

export default Food;
