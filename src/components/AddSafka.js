import { useEffect, useState } from "react";
import "../erno.css";
import DA from "./dynamicTextArea";
import { postFetch } from "../common/utils";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const [category, setCategory] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");
  const [plusCalories, setPlusCalories] = useState(0);

  let i = 0;
  const navigate = useNavigate();

  const hour = new Date().getHours()

  useEffect(() => {
    if (hour > 16){
      setCategory("Päivällinen");
    } else if (hour < 10){
      setCategory("Aamiainen");
    }
    else if (hour > 10 && hour < 13){
      setCategory("Lounas");
    }
  
  },[hour])

  const onSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString("fi-FI");

    console.log("Category: ", category);
    const data = { today, category, receipt, plusCalories };
    console.log("Adding food data: ", data);
    postFetch("http://localhost:8000/Safka", data);
  };

  const handleSelect = (e) => {
    console.log("select value: ", e.target.value);
    setCategory(e.target.value)
  };

  const option = ["Aamiainen", "Lounas", "Välipala", "Päivällinen", "Iltapala"];

  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>

      <h1 className="main-otsikko">Aterian syöttö</h1>

      <form className="adder--form">
        <select name="tapahtuma" value={category} onChange={handleSelect}>
          {option.map((o) => (
            <option key={i++} value={o}>
              {o}
            </option>
          ))}
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

        <button onClick={onSubmit}>Luo recordi</button>
      </form>
      {error && error}
    </div>
  );
};

export default Food;
