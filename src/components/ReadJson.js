import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import bmi from "../Images/Screenshot_20230814_081657_BodyFast.jpg";
import jsonData from "../data/erno2.json";

// import { Line } from './Line.ts';

const Reader = () => {
  let [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let id = 1;
  return (
    <div className="main">
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">
        <a href={bmi}>Näytä koko data</a>
      </h1>

      <table className="taulu">
        <thead>
          <tr>
            <th>Alku</th>
            <th>loppu</th>
          </tr>
        </thead>
        {jsonData.Paasto.map((p) =>
          p.paasto.map((pt) => (
            <tbody key={nanoid()}>
              <tr>
                <td>{id++}</td>
                <td key={nanoid()}>{pt.alku}</td>
                <td key={nanoid()}>{pt.loppu}</td>
              </tr>
            </tbody>
          ))
        )}
      </table>
    </div>
  );
};

export default Reader;
