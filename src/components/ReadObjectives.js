import "../eight.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "../eight.css";
import { useNavigate } from "react-router-dom";
import {
  ThemeProvider,
  DefaultTheme,
  StyleReset,
  Div,
  Button,
  Text,
  Icon,
} from "react-atomize";

// import { Line } from './Line.ts';

const ReadObjectives = () => {
  const [obj, setObj] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [sumPlusCalories, setPlusCalories] = useState(0);
  const [sumMinusCalories, setMinusCalories] = useState(0);
  const [done, setDone] = useState(null);
  const navigate = useNavigate();
  let plusList = [];
  let minusList = [];
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
  }

  //Delete path
  const handleChange = (e) => {
    //delete json item
    fetch("http://localhost:8000/Tavoitteet/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((obj) => {
        window.location.reload();
        return;
      });
  };
  let donestr = "";

  const handleDone = (o, e) => {
    const data = {
      done: e,
    };

    fetch("http://localhost:8000/Tavoitteet/" + parseInt(o), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        return;
      });
  };

  return (
    <>
      <div className="main">
        <button className="main-button" onClick={() => navigate("/")}>
          Pääsivu
        </button>

        <h1 className="main-otsikko">Tavoitteet</h1>
        <table className="main taulu" key={nanoid()}>
          <thead>
            <tr>
              <th>PVM</th>
              <th>Tavoite</th>
              <th>Viikko</th>
              <th>Info</th>
              <th>Tehty</th>
            </tr>
          </thead>

          {obj.map((o) => {
            return (
              <tbody key={nanoid()}>
                <tr key={nanoid()}>
                  <td>{o.today}</td>
                  <td>{o.objective}</td>
                  <td>{o.week}</td>
                  <td>{o.addInfo}</td>
                  <td>
                    <input
                      type="checkbox"
                      name="done"
                      checked={o.done}
                      onChange={(e) => handleDone(o.id, e.target.checked)}
                    ></input>
                  </td>
                  <td>
                    <button onClick={(e) => handleChange(o.id)}>x</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ReadObjectives;
