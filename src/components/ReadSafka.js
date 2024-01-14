import "../eight.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { updateRecord } from "../common/utils";

// import { Line } from './Line.ts';

const ReadReceipts = () => {
  const [rData, setReceipt] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [sumPlusCalories, setPlusCalories] = useState(0);
  const [sumMinusCalories, setMinusCalories] = useState(0);

  const navigate = useNavigate();

  let plusList = [];
  let minusList = [];
  let sum = 0;
  let minSum = 0;

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/Safka")
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Could not fetch the data for that resource, check json server startup"
            );
          }
          return res.json();
        })
        .then((rData) => {
          setReceipt(rData);
          setPending(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setPending(false);
        });
    }, 1000);
  }, []);

  const plusResult = rData.map((r) => {
    const curdate = new Date().toLocaleDateString("fi-FI");
    console.log("today:", r.today + ", curdate:", curdate);
    if (curdate === r.today) {
      sum += parseInt(r.plusCalories);
    }
    return sum;
  });

  const minusResult = rData.map((r) => {
    const curdate = new Date().toLocaleDateString("fi-FI");
    console.log("today:", r.today + ", curdate:", curdate);
    if (curdate === r.today) {
      minSum += parseInt(r.lostCalories);
    }
    return minSum;
  });

  if (error) {
  }

  let savings = 2500 - (sum + minSum);

  //Delete path
  const deleteRecord = (e) => {
    //delete json item
    fetch("http://localhost:8000/Safka/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((rData) => {
        window.location.reload();
        return;
      });
  };

  let summa = 0;
  rData.forEach((s) => {
    console.log(s.diff);
    summa += parseInt(s.diff);
  });

  const latestReportDay = rData[rData.length - 1]?.today;
  return (
    <div className="main">
      <div className="safka--text">
        <ul>
          <li>
            {latestReportDay} päivän kalorit {sum}, kulutettuja raportoitu {minSum}, erotus {sum - minSum}.
          </li>
          <li>Päivän säästö (lukuhekellä) {savings}, oletuskulutus 2500 / pv.</li>
          <li>Säästöt yhteensä {summa}</li>
        </ul>
      </div>
      <br></br>
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">Mittari</h1>
      <table className="taulu" key={nanoid()}>
        <thead>
          <tr key = {nanoid()}>
            <th key={nanoid()}>PVM</th>
            <th key={nanoid()}>Luokitus</th>
            <th key={nanoid()}>Safka</th>
            <th key={nanoid()}>+ Kalorit</th>
            <th key={nanoid()}>- Kalorit</th>
            <th key={nanoid()}>Säästö</th>
          </tr>
        </thead>
        {rData.map((safka) => (
          <tbody key = {nanoid()}>
            {safka.today.includes("2024") && (
              <tr>
                <>
                  <td>{safka.today}</td>
                  <td>{safka.category}</td>
                  <td>{safka.receipt}</td>
                  <td>{safka.plusCalories}</td>
                  <td>{safka.lostCalories}</td>
                  <td>{safka.diff}</td>
                  <td>
                    <button onClick={(e) => deleteRecord(safka.id)}>x</button>
                  </td>
                </>
              </tr>
            )}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ReadReceipts;
