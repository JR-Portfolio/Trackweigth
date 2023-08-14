import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../eight.css";
import ErrorBoundary from "./ErrorBoundary";

function Main(props) {
  const [measures, setMeasures] = useState(false);
  const [readMeasureData, setReadMeasureData] = useState(false);
  const navigate = useNavigate();

  function addData(e) {
    console.log(e);
    if (e) {
      navigate("/addMeasures");
    } else {
      navigate("/");
    }
  }

  function readMeasures(e) {
    console.log(e);
    if (e) {
      navigate("/readMeasures");
    } else {
      navigate("/");
    }
  }

  function readObjectives(e) {
    console.log(e);
    if (e) {
      navigate("/readObjectives");
    } else {
      navigate("/");
    }
  }

  function addObjectives(e) {
    console.log(e);
    if (e) {
      navigate("/addObjectives");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <div className="selections">
        <h1>8 viikon haaste</h1>
        <label>
          Lisää mitat
          <ErrorBoundary>
            <input
              name="measures"
              type="checkbox"
              onChange={(event) => addData(event.target.checked)}
            />
          </ErrorBoundary>
        </label>
        <label>
          Näytä mitat
          <ErrorBoundary>
            <input
              name="readCB"
              type="checkbox"
              onChange={(event) => readMeasures(event.target.checked)}
            />
          </ErrorBoundary>
        </label>
        <label>
          <p></p>
          Näytä tavoitteet
          <ErrorBoundary>
            <input
              name="readObjectives"
              type="checkbox"
              onChange={(event) => readObjectives(event.target.checked)}
            />
          </ErrorBoundary>
        </label>
        <label>
          Aseta tavoite
          <ErrorBoundary>
            <input
              name="addObjectives"
              type="checkbox"
              onChange={(event) => addObjectives(event.target.checked)}
            />
          </ErrorBoundary>
        </label>
      </div>
    </>
  );
}

export default Main;
