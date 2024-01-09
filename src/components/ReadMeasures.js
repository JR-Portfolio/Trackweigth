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

        const level = bmi > 28 ? 'highLevel' : 'orangeLevel'

        return (
          <>
            <table key={nanoid()} className="taulu">
              <thead key={nanoid()}>
                <th key={nanoid()}>PVM</th>
                <th key={nanoid()}>Paino</th>
                <th key={nanoid()}>Vyötärö</th>
                <th key={nanoid()}>V.muutos</th>
                <th key={nanoid()}>P.muutos</th>
                <th key={nanoid()}>BMI</th>
                <th key={nanoid()}>Kommentti</th>                
              </thead>
              <tbody key={nanoid()}>
                {data.map((item) =>  (
                  <tr className={level} key={nanoid()} >
                    <td key={nanoid()}>
                      {item.today}
                    </td>
                    {!!item.paino && (
                      <td key={nanoid()}>
                        {item.paino} kg
                      </td>
                    )}
                    {!!item.vyotaro && (
                      <td key={nanoid()}>
                        {item.vyotaro}{" "}
                        cm
                      </td>
                    )}
                    {!isNaN(vyotaroMuutos) && (
                      <td key={nanoid()}>                        
                        {vyotaroMuutos}
                      </td>
                    )}

                    {!isNaN(painonMuutos) && (
                      <td key={nanoid()}>                        
                        {painonMuutos}
                      </td>
                    )}

                    {!isNaN(bmi) && (
                      <td key={nanoid()}>
                        {bmi}
                      </td>
                    )}

                    {lines?.map((l) => (
                        <td key={nanoid()}>{l}</td>

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
