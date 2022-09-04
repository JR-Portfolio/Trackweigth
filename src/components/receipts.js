import { useState } from "react";
import "../erno.css";
import DA from "./dynamicTextArea";

const Food = () => {
  const [category, setCategory] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");

  console.log('luokitus:', category)
  console.log('resepti:', receipt)

  const onSubmit = (e) => {
    console.log("onSubmit - function");
    e.preventDefault();

    const today = new Date().toLocaleDateString("fi-FI");
    console.log("today:", today);

    const data = { today, category, receipt };

    fetch("http://localhost:8000/Reseptit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(() => {
      console.log("Safka kirjattu");
      window.location.reload();
    })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return (
    <div>
      {error && error}
      <h3>Uusi resepti</h3>

      <form className="resepti--form">
      <label>
          Valitse ruokailu:
          <select name="tapahtuma" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="aamiainen">Aamiainen</option>
            <option value="lounas">Lounas</option>
            <option value="valipala">Välipala</option>
            <option value="paivallinen">Päivällinen</option>
            <option value="iltapala">Iltapala</option>
          </select>
        </label>
        <textarea name = "resepti" onChange={(e) => setReceipt(e.target.value)} />

        <button onClick={onSubmit}>Luo resepti</button>
      </form>
      {error && error}
    </div>
  );
};

export default Food;
