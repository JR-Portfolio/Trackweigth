import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import bmi from "../Images/Screenshot_20230814_081657_BodyFast.jpg";
import { useGetExercices, deleteExercise } from "../hooks/useData";
import { deleteItem } from "../common/utils.js";

const Readexercises = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const exercises = useGetExercices();
  console.log("exercises:", exercises);

  exercises.map((training) => {
    let valid = false;

    if (training.kommentti !== undefined || training.kommentti !== "") {
      let tekstikommentti = training.kommentti;
    }
    return valid;
  });

  const deleteExercise = (ind) => {
    deleteItem("http://localhost:8000/Harjoitus/", ind);
  };

  console.log(exercises);

//Sort
const sortedExercise = exercises.sort((a,b) => {return b.id - a.id})


  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">
        <a href={bmi}>Harjoitus Mittari</a>
      </h1>
      <>
        <table className="taulu">
          <thead>
            <th>PVM</th>
            <th>Harjoitus</th>
            <th>Kommentit</th>
          </thead>

          {sortedExercise?.map((training, index) => (
            //var harjoitusLines = training?.harjoitus?.split(".");

            <tbody key={nanoid()}>
              <tr key={nanoid()}>
                <td key={nanoid()}>{training.today}</td>
                <td key={nanoid()}>{training.harjoitus}</td>

                <td key={nanoid()}>{training.kommentti}</td>

                <td>
                  <button onClick={(e) => deleteExercise(training.id)}>
                    x
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </>
    </div>
  );
};

export default Readexercises;
