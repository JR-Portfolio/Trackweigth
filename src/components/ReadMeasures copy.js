import "../eight.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";
import bmi from "../Images/Screenshot_20230814_081657_BodyFast.jpg";
import { deleteItem } from "../common/utils";


// import { Line } from './Line.ts';

const Reader = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams()  
  const typeFilter = searchParams.get("paino")
  
  

  const sortedData = data.sort((a, b) => b.id - a.id);

  const cWidth = (kommentti) => {
    kommentti.length > 30 ? (cWidth = "wide") : (cWidth = "narrow");
  };

  const ALKUPAINO = 92.9

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

  let newLines = [];
  let bmiRes = 0;
  let painonMuutos = 0;
  let vyotaroMuutos = 0;
  let rinnanMuutos = 0;
  let lantionMuutos = 0;
  let bmi = 0;
  let lines = [];
  let level = "";

  const bmiCheck = (paino) => {
    let bmiRes = 1.3 * (paino / Math.pow(1.75, 2.5)).toFixed(2);
    console.log("bmi: ", bmiRes);
    if (bmiRes > 28) {
      level = "highLevel";
    } else if (bmiRes < 28 && bmi > 26) {
      level = "midLevel";
    } else if (bmiRes < 26) {
      level = "lowLevel";
    }

    return bmiRes.toFixed(2);
  };
  console.log("bmiRes: " + bmiRes + ", level: " + level);

  //Json row handler
  const nData = data.slice(1);

  const showLines = (item2) => {
    const lines = item2?.kommentti?.split(".");
    newLines = lines.join(".\n\n");
    console.log("newLine: ", newLines);
    return newLines;
  };


  let displayWeightAbove885 = 0
  const handleFilterChange = (key, value) => {    
    console.log('key: ', key, 'value:', value)        
    setSearchParams(prevParams => {
      if (!value){
        prevParams.delete(key)        
      } else {
        displayWeightAbove885 = data.filter(w => w.paino > value)    
        console.log("dw: ", displayWeightAbove885)
        prevParams.set(key, value)
      }

      console.log("prevParams: ", prevParams)
      return prevParams;
    })
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


      <button onClick = {() => handleFilterChange("paino", 88.5) }>Paino yli 88.5 kg</button>
      <button onClick = {() => handleFilterChange("paino", null) }>Poista filter</button>
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
            <th className={cWidth} key={nanoid()}>
              Kommentti
            </th>
            <th>Kg matkaa</th>
            <th>Poista</th>
          </thead>

          <tbody key={nanoid()}>
           
            {data.map((item2) => (
              <tr className={level} key={nanoid()}>
                <td key={nanoid()}>{item2?.today}</td>
                {!!item2?.paino && <td key={nanoid()}>{!displayWeightAbove885 ? item2.paino : displayWeightAbove885} kg</td>}
                {!!item2?.vyotaro && (
                  <td key={nanoid()}>{item2?.vyotaro} cm</td>
                )}

                {!isNaN(item2?.vyotaro) && (
                  <td key={nanoid()}>{data[data.length-1].vyotaro - item2.vyotaro}</td>
                )}

                {!isNaN(painonMuutos) && (
                  <td key={nanoid()}>
                    {(data[data.length-1].paino.toFixed(2) - item2.paino).toFixed(2)}
                  </td>
                )}
                {!isNaN(lantionMuutos) && (
                  <td key={nanoid()}>
                    {(data[data.length-1].lantio.toFixed(2) - item2.lantio).toFixed(2)}
                  </td>
                )}
                {!isNaN(rinnanMuutos) && (
                  <td key={nanoid()}>
                    {(data[data.length-1].rinta.toFixed(2) - item2.rinta).toFixed(2)}
                  </td>
                )}

                {
                  <td className={level} key={nanoid()}>
                    {(bmiRes = bmiCheck(item2.paino))}
                  </td>
                }

                <td className={cWidth} key={nanoid()}>
                  {(lines = showLines(item2))}
                </td>
                <td key={nanoid()}>{(item2.paino - 76.56).toFixed(2)}</td>
              </tr>
            ))}
          
          </tbody>
          
        </table>
      </>
    </div>
  );
};

export default Reader;
