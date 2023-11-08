import React, { useEffect, useState } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";
import { postFetch } from "../common/utils";

const AddObjectives = () => {
  const [week, setWeek] = useState();
  const [objective, setObjective] = useState();
  const [addInfo, setAddInfo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
    );
    setWeek(weekNumber);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    postFetch('http://localhost:8000/Tavoitteet', objective, week, addInfo, done )
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
