import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../eight.css";
import ErrorBoundary from "./ErrorBoundary";

function Main(props) {
  const [measures, setMeasures] = useState(false);
  const [readMeasureData, setReadMeasureData] = useState(false);
  const navigate = useNavigate();

  const handler = (e) => {
    if (e.target.value === "readMess") {
      navigate("/readMeasures");
    } else if (e.target.value === "addMess") {
      navigate("/addMeasures");
    } else if (e.target.value === "addSafka") {
      navigate("/addSafka");
    } else if (e.target.value === "readSafka") {
      navigate("/readSafka");
    } else if (e.target.value === "addObjectives") {
      navigate("/addObjectives");
    } else if (e.target.value === "readObjectives") {
      navigate("/readObjectives");
    } else if (e.target.value === "addExercise") {
      navigate("/addExercise");
    } else if (e.target.value === "readExercise") {
      navigate("/readExercise");
    } else if (e.target.value === "addWkFasting") {
      navigate("/addWkFasting");
    } else if (e.target.value === "readFasting") {
      navigate("/readFasting");
    } else if (e.target.value === "readJson") {
      navigate("/readJson");
    } else if (e.target.value === "savings") {
      navigate("/savings");
    }
  };

  return (
    <>
      <div className="selections">
        <h1>UPS</h1>
        <strong>
          Ultimaattinen<br></br>
          Painonhallinta<br></br>
          Systeemi
        </strong>

        <ErrorBoundary>
          <select name="mitat" onChange={(event) => handler(event)}>
            <option value="def">Valitse</option>
            <option value="addSafka">Lisää safka</option>
            <option value="readSafka">Lue safka</option>
            <option value="addMess">Lisää mitat</option>
            <option value="readMess">Lue mitat</option>
            <option value="addExercise">Lisää harjoitus</option>
            <option value="readExercise">Lue harjoitukset</option>
            <option value="addObjectives">Aseta tavoite</option>
            <option value="readObjectives">Tavoitteet</option>
            <option value="savings">Säästöt</option>
          </select>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default Main;
