import "../eight.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import '../eight.css'
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../common/utils";

// import { Line } from './Line.ts';

const ReadObjectives = () => {
  const [obj, setObj] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [sumPlusCalories, setPlusCalories] = useState(0)
  const [sumMinusCalories, setMinusCalories] = useState(0)
  const navigate = useNavigate()

  let plusList = []
  let minusList = []
  let sum = 0;
  let minSum = 0;

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/Tavoitteet")
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Could not fetch the data for that resource, check json server startup"
            );
          }
          return res.json();
        })
        .then((obj) => {
          setObj(obj);
          setPending(false);
          setError(null);
        })
        
        .catch((err) => {
          setError(err.message);
          setPending(false);
        });
    }, 1000);
  }, []);

  if (error) {
    console.log("error:", error);
  }

  //Delete path
  const handleChange = (e) => {
    deleteItem("http://localhost:8000/Tavoitteet", e)
  };


  return (
    <div>
      {!obj && <h3>Ei asetettuja tavoitteita<p/></h3>}

      <div className="main taulu">      

      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">Tavoitteet</h1>    

        {obj.map(o => {
          return(
            <div>
              {obj.length > 0 && <table id="cal" key={nanoid()}>
                <tbody>
                  <tr>
                  <td className="medium"><b>PVM: </b>{o.today}</td>
                    <td className="medium"><b>Tavoite: </b>{o.objective}</td>
                    <td className="big"><b>Viikko: </b>{o.week}</td>
                    <td className="small"><b>Info: </b>{o.addInfo}</td>
                    <td>
                      <button onClick={(e) => handleChange(obj.id)}>x</button>
                    </td>
                  </tr>
                </tbody>
              </table>}
            </div>
          )
    })}
    </div>
    </div>
  );
};

export default ReadObjectives;
