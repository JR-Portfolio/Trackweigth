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
        var lines = item.kommentti?.split(".");
        let kommenttiLine = "";

        return (
          <>
            <table className="taulu">
              <thead>
                <th>PVM</th>
                <th>Paino</th>
                <th>Vyötärö</th>
                <th>V.muutos</th>
                <th>P.muutos</th>
                <th>BMI</th>
                <th>Kommentti</th>                
              </thead>
              <tbody key={nanoid()}>
                {data.map((item) =>  (
                  <tr key={nanoid()}>
                    <td>
                      {item.today}
                    </td>
                    {!!item.paino && (
                      <td>
                        {item.paino} kg
                      </td>
                    )}
                    {!!item.vyotaro && (
                      <td>
                        {item.vyotaro}{" "}
                        cm
                      </td>
                    )}
                    {!isNaN(vyotaroMuutos) && (
                      <td>                        
                        {vyotaroMuutos}
                      </td>
                    )}

                    {!isNaN(painonMuutos) && (
                      <td>                        
                        {painonMuutos}
                      </td>
                    )}

                    {!isNaN(bmi) && (
                      <td>
                        {bmi}
                      </td>
                    )}

                    {lines?.map((l) => (
                      <tr>
                        <td>{l}</td>
                      </tr>
                    ))}

                    <td>
                      <button onClick={(e) => handleChange(item.id)}>x</button>
                    </td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </>
        );
      })}
    </div>
  );
};

export default Reader;
