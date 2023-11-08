import React, { useState, useEffect } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";

const AddMeasures = () => {
  const [paasto, setPaasto] = useState();
  const [test, setTest] = useState({ taski: null, taski2: null });

  const [wk, setWeek] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let sum = 0;

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

    /*
    const data = { wk, paasto };
    

    fetch("http://localhost:8000/Paasto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        
        navigate("/readFasting");
      })
      .catch((err) => {
        
        setError(err.message);
      });
      */
  };

  function setFastingHours(paastopv) {
    if (!paastopv) {
      paastopv = "00:00-18:00";
    }
    if (paastopv) {
      const separatedTimes = paastopv.split("-");

      const start = separatedTimes[0].split(":");
      const end = separatedTimes[1].split(":");
      console.log(
        "Starting hours:",
        parseInt(start[0]) + ", starting minutes: ",
        parseInt(end[1])
      );
      console.log(
        "Ending hours:",
        parseInt(end[0]) + ", ending minutes: ",
        parseInt(end[1])
      );

      let dayFastingSum =
        60 * parseInt(end[0]) -
        parseInt(start[0]) +
        parseInt(end[1]) -
        parseInt(start[1]);

      sum += dayFastingSum; //Sum indicate whole wk fasting times.
      return dayFastingSum; //Returning only one day sum
    }
  }

  return (
    <>
      <div className="main paasto">
        <button className="main-button" onClick={() => navigate("/")}>
          Pääsivu
        </button>
        <h1 className="main-otsikko">Viikon {wk} paasto pläni</h1>
        <form>
          <label>Test</label>
          <input
            type="text"
            name="test"
            value={test.taski}
            onChange={(e) => setTest({ ...test, taski: e.target.value })}
          />
          <label>Test2</label>
          <input
            type="text"
            name="test2"
            value={test.taski2}
            onChange={(e) => setTest({ ...test, taski2: e.target.value })}
          />

          <button onClick={onSubmit}>Lisää plani</button>
        </form>
      </div>
    </>
  );
};

export default AddMeasures;
