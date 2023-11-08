import "../eight.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// import { Line } from './Line.ts';

const ReadReceipts = () => {
  const [rData, setReceipt] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [sumPlusCalories, setPlusCalories] = useState(0);
  const [sumMinusCalories, setMinusCalories] = useState(0);

  let plusList = [];
  let minusList = [];
  let sum = 0;
  let minSum = 0;

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/Reseptit")
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
    sum += parseInt(r.plusCalories);

    return sum;
  });

  const minusResult = rData.map((r) => {
    minSum += parseInt(r.lostCalories);

    return minSum;
  });

  if (error) {
  }

  //Delete path
  const handleChange = (e) => {
    //delete json item
    fetch("http://localhost:8000/Reseptit/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((rData) => {
        window.location.reload();
        return;
      });
  };

  return (
    <div>
      <h3>
        Safkat / reseptit
        <p />
      </h3>
      <h4>
        Hankittujen kaloreiden summa {sum}, kulutettujen kaloreiden summa{" "}
        {minSum}, {sum - minSum}
      </h4>
      <h5>Jos alle 1500 plussalla päivän lopuksi niin aika yes.</h5>

      <div className="reader">
        {rData.map((safka) => {
          if (safka.lostCalories === 0) {
            safka.diff = 0;
          }

          return (
            <div>
              <table id="cal" key={nanoid()}>
                <tbody>
                  <tr>
                    <td className="medium">
                      <b>PVM: </b>
                      {safka.today}
                    </td>
                    <td className="medium">
                      <b>Luokitus: </b>
                      {safka.category}
                    </td>
                    <td className="big">
                      <b>Safka: </b>
                      {safka.receipt}
                    </td>
                    <td className="small">
                      <b>+ kalorit: </b>
                      {safka.plusCalories}
                    </td>
                    <td className="small">
                      <b>- kalorit: </b>
                      {safka.lostCalories}
                    </td>
                    <td className="small">
                      <b>Erotus: </b>
                      {safka.diff}
                    </td>
                    <td>
                      <button onClick={(e) => handleChange(safka.id)}>x</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadReceipts;
