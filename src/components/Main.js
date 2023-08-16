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
    } else if (e.target.value === "addObjectives") {
      navigate("/addObjectives");
    } else if (e.target.value === "readObjectives") {
      navigate("/readObjectives");
    }
  };

  return (
    <>
      <div className="selections">
        <h1>8 viikon haaste</h1>

        <ErrorBoundary>
          <select name="mitat" onChange={(event) => handler(event)}>
            <option value="def">Valitse</option>
            <option value="addMess">Lisää mitat</option>
            <option value="readMess">Lue mitat</option>
            <option value="addObjectives">Aseta tavoite</option>
            <option value="readObjectives">Tavoitteet</option>
          </select>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default Main;
