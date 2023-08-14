import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

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
          console.log("readData data:", data);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 1000);
  }, []);

  if (error) {
    console.log("error:", error);
  }

  
  data.map((ditem) => {
    let valid = false;
    ditem.today.includes("2023") ? (valid = true) : (valid = false);
    
    if (ditem.kommentti !== undefined || ditem.kommentti !== "") {
      let tekstikommentti = ditem.kommentti;
      console.log("Kommentit joissa tekstiä: ", tekstikommentti);
    }
    return valid;
  });

  //Delete path
  const handleChange = (e) => {
    console.log("record id", e);
    //delete json item
    fetch("http://localhost:8000/Mitat/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        return console.log("Record ", e + " deleted");
      });
  };

  return (
    <div className = "main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">Mittari</h1>

      {data.map((item, index) => {
        return (
          <>
            <table key={nanoid()}>
              <div className="taulu">
                <tbody>
                  {item.today.includes("2023") && (
                    <tr>
                      <td>
                        <strong key = {index}> PVM: </strong> {item.today}
                      </td>
                      <td>
                        <strong key = {index}> Paino: </strong> {item.paino} kg
                      </td>
                      <td>
                        <strong key = {index}> Vyötärö: </strong> {item.vyotaro} cm
                      </td>
                      <td>
                        <strong key = {index}> BMI: </strong> {(item.paino / (1.75 * 1.75)).toFixed(2)}
                      </td>
                      <td>{data.kommentti !== "" ? item.kommentti : ""}</td>
                      <td>
                        <button onClick={(e) => handleChange(item.id)}>
                          x
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </div>
            </table>
          </>
        );
      })}
    </div>
  );
};

export default Reader;
