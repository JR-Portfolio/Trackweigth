import { useState } from "react";
import "../erno.css";
import DA from "./dynamicTextArea";

const Food = () => {
  const [category, setCategory] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");
  const [plusCalories, setPlusCalories] = useState(0);
  const [lostCalories, setLostCalories] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString("fi-FI");

    const diff = plusCalories - lostCalories;

    const data = { today, category, receipt, plusCalories, lostCalories, diff };

    fetch("http://localhost:8000/Reseptit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="adder-form">
      {error && error}
      <h3>Uusi resepti</h3>

      <form className="resepti--form">
        <label>
          Valitse ruokailu:
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
        </label>
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
