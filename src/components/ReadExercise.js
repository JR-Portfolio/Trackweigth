import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import bmi from "../Images/Screenshot_20230814_081657_BodyFast.jpg";
import { useGetExercices, deleteExercise } from "../hooks/useData";

const Readexercises = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const exercises = useGetExercices()
  console.log("exercises:", exercises)
 
  exercises.map((training) => {
    let valid = false;
    training.today.includes("2023") ? (valid = true) : (valid = false);

    if (training.kommentti !== undefined || training.kommentti !== "") {
      let tekstikommentti = training.kommentti;
    }
    return valid;
  });

const deleteExercise = (e) => {
  deleteExercise(e)
}

  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">
        <a href={bmi}>Harjoitus Mittari</a>
      </h1>

      {exercises.map((training, index) => {
        console.log(exercises)
        var kommenttiLines = training.kommentti.split(".");
        var harjoitusLines = training.harjoitus.split(".");

        return (
          <>
            <table className="taulu">
              <thead>
                <th>PVM</th>
                <th>Harjoitus</th>
                <th>Kommentit</th>
              </thead>
              <tbody key={nanoid()}>
                {training.today.includes("2023") && (
                  <tr key={nanoid()}>
                    <td>{training.today}</td>
                    {harjoitusLines.map((t) => (
                      <tr>
                        <td>{t}</td>
                      </tr>
                    ))}

                    {kommenttiLines.map((l) => (
                      <td>{l}</td>
                    ))}

                    <td>
                      <button onClick={(e) => deleteExercise(training.id)}>
                        x
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        );
      })}
    </div>
  );
};

export default Readexercises;
