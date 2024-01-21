import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import bmi from "../Images/Screenshot_20230814_081657_BodyFast.jpg";
import { deleteItem } from "../common/utils";

// import { Line } from './Line.ts';

const Reader = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/Mitat")
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Could not fetch the data for that resource, check json server startup"
            );
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 1000);
  }, []);

  const deleteRecord = (e) => {
    //delete json item
    deleteItem("http://localhost:8000/Mitat/", e);
  };

  let painonMuutos = 0;
  let vyotaroMuutos = 0;
  let rinnanMuutos = 0;
  let lantionMuutos = 0;
  let bmi = 0;
  let lines = [];
  let level = "";

  const nData = data.slice(1);
  nData.map((item) => {
    vyotaroMuutos = (
      parseFloat(item.vyotaro) - parseFloat(data[0].vyotaro)
    ).toFixed(2);
    painonMuutos = (item.paino - data[0].paino).toFixed(2);

    lantionMuutos = (item.lantio - data[0].lantio).toFixed(2);
    rinnanMuutos = (item.rinta - data[0].rinta).toFixed(2);

    //bmi = item.paino / (1.75 * 1.75).toFixed(2);
    lines = item.kommentti?.split(".");

    console.log(
      "p.muuto: ",
      painonMuutos + ", v.muutos: ",
      vyotaroMuutos,
      ", lantionMuutos: ",
      lantionMuutos,
      ", rinnanMuutos: ",
      rinnanMuutos
    );

    /*
    if (bmi > 28) {
      level = "highLevel";
    } else if (bmi < 28 && bmi > 26) {
      level = "midLevel";
    } else if (bmi < 26) {
      level = "lowLevel";
    }
    */

    console.log("level: ", level);
  });

  let newLines = []

  const showLines = (item2) =>{
    const lines = item2?.kommentti?.split(".")
    newLines = lines.join('.\n\n')
    console.log("newLine: ", newLines)
    return newLines
  }

  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">
        <a href={bmi}>Mittari</a>
      </h1>
      <>
        <table key={nanoid()} className="taulu">
          <thead key={nanoid()}>
            <th key={nanoid()}>PVM</th>
            <th key={nanoid()}>Paino</th>
            <th key={nanoid()}>Vyötärö</th>
            <th key={nanoid()}>Vyötärön muutos</th>
            <th key={nanoid()}>Painon muutos</th>
            <th key={nanoid()}>Lantion muutos</th>
            <th key={nanoid()}>Rinnan muutos</th>
            <th key={nanoid()}>BMI</th>
            <th key={nanoid()}>Kommentti</th>
          </thead>

          <tbody key={nanoid()}>
            <tr className={level} key={nanoid()}>
              <td key={nanoid()}>{data[0]?.today}</td>
              {!!data[0]?.paino && <td key={nanoid()}>{data[0]?.paino} kg</td>}
              {!!data[0]?.vyotaro && (
                <td key={nanoid()}>{data[0]?.vyotaro} cm</td>
              )}
              <td></td>
              <td></td>
              <td></td>

              <td></td>
              <td key={nanoid()}>
                {(data[0]?.paino / (1.75 * 1.75)).toFixed(2)}
              </td>
              <td key={nanoid()}>{data[0]?.kommentti}</td>
            </tr>

            {nData.map((item2) => (
              <tr className={level} key={nanoid()}>
                <td key={nanoid()}>{item2?.today}</td>
                {!!item2?.paino && <td key={nanoid()}>{item2?.paino} kg</td>}
                {!!item2?.vyotaro && (
                  <td key={nanoid()}>{item2?.vyotaro} cm</td>
                )}

                {!isNaN(item2?.vyotaro) && (
                  <td key={nanoid()}>{data[0].vyotaro - item2.vyotaro}</td>
                )}

                {!isNaN(painonMuutos) && (
                  <td key={nanoid()}>
                    {(data[0].paino.toFixed(2) - item2.paino).toFixed(2)}
                  </td>
                )}
                {!isNaN(lantionMuutos) && (
                  <td key={nanoid()}>
                    {(data[0].lantio.toFixed(2) - item2.lantio).toFixed(2)}
                  </td>
                )}
                {!isNaN(rinnanMuutos) && (
                  <td key={nanoid()}>
                    {(data[0].rinta.toFixed(2) - item2.rinta).toFixed(2)}
                  </td>
                )}

                {
                  <td key={nanoid()}>
                    {(item2.paino / (1.75 * 1.75)).toFixed(2)}
                  </td>
                }

                <td key={nanoid()}>{lines = showLines(item2)}</td>

                <td>
                  <button onClick={(e) => deleteRecord(item2.id)}>x</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default Reader;
