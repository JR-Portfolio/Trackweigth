import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import bmi from "../Images/Screenshot_20230814_081657_BodyFast.jpg";

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

  if (error) {
  }

 
  /*
  data.map((ditem) => {
    let valid = false;
    ditem.today.includes("2023") ? (valid = true) : (valid = false);
    if (ditem.kommentti !== undefined || ditem.kommentti !== "") {
      let tekstikommentti = ditem.kommentti;
    }
    return valid;
  });
  */

  //Delete path
  const handleChange = (e) => {
    //delete json item
    fetch("http://localhost:8000/Mitat/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        return;
      });
  };

  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">
        <a href={bmi}>Mittari</a>
      </h1>

      {data.map((item, index) => {
        const vyotaroMuutos = (item.vyotaro - data[0].vyotaro).toFixed(2);
        const painonMuutos = (item.paino - data[0].paino).toFixed(2);
        const bmi = item.paino / (1.75 * 1.75).toFixed(2);
        var lines = item.kommentti.split(".");
        let kommenttiLine = "";
        return (
          <>
            <table className="taulu">
              <tbody key={nanoid()}>
                {item.today?.includes("2023") && (
                  <tr key={nanoid()}>
                    <td>
                      <strong key={index}> PVM: </strong> {item.today}
                    </td>
                    {!!item.paino && (
                      <td>
                        <strong key={index}> Paino: </strong> {item.paino} kg
                      </td>
                    )}
                    {!!item.vyotaro && (
                      <td>
                        <strong key={index}> Vyötärö: </strong> {item.vyotaro}{" "}
                        cm
                      </td>
                    )}
                    {!isNaN(vyotaroMuutos) && (
                      <td>
                        <strong key={index}>Vyötärön muutos:</strong>{" "}
                        {vyotaroMuutos}
                      </td>
                    )}

                    {!isNaN(painonMuutos) && (
                      <td>
                        <strong key={index}>Painon muutos (kg):</strong>{" "}
                        {painonMuutos}
                      </td>
                    )}

                    {!isNaN(bmi) && (
                      <td>
                        <strong key={index}> BMI: </strong> {bmi}
                      </td>
                    )}

                    {lines.map((l) => (
                      <td>{l}</td>
                    ))}

                    <td>
                      <button onClick={(e) => handleChange(item.id)}>x</button>
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

export default Reader;
