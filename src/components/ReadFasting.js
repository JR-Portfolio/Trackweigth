import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import bmi from "../Images/Screenshot_20230814_081657_BodyFast.jpg";
import jsonData from "../data/erno2.json";
import { useLoadFasting } from "../hooks/useData";

const Reader = () => {
  let [data, setData] = useState([]);
  const navigate = useNavigate();

  const fastingData = useLoadFasting()
  if (fastingData.length === 1){ 
  setData(fastingData)
}

  //Delete path
  const deleteFastingRow = (ind) => {
    //delete json item
    fetch("http://localhost:8000/Paasto/" + ind, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        return;
      });
  };

  if (!data || data.length === 0) {
    data = jsonData;
  }

  var text = "";



  data.Paasto.map(p => (  
  p.paasto.map(i => console.log(i.alku))
))

  //<span className="target">{text}</span>
  
  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">
        <a href={bmi}>Paasto Mittari</a>
        
      </h1>

      <>
        {(!data || data.length === 0) && <h1> Ei dataa </h1>}

        {data && (
          <table className="taulu">
            <>
              <thead>
                <tr>
                  <th>{data.wk}</th>
                  <th key={nanoid()}>Alku</th>
                  <th key={nanoid()}>Loppu</th>
                </tr>
              </thead>
              {data.Paasto.map((item) => (
                item.paasto.map(f => (
                <tbody key={nanoid()}>
                  <tr>
                    <td key={nanoid()}>{f.alku}</td>
                    <td key={nanoid()}>{f.loppu}</td>
                    <td key={nanoid()}>
                      <button onClick={(e) => deleteFastingRow(f.alku)}>
                        x
                      </button>
                    </td>
                  </tr>
                </tbody>
              )))
            )}
            </>
          </table>
        )}
      </>
    </div>
  );
};

export default Reader;
