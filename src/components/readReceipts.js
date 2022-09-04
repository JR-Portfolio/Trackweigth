import "../eight.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// import { Line } from './Line.ts';

const ReadReceipts = () => {
  const [rData, setReceipt] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Haetaan reseptit");
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
          console.log("resepti data:", rData);
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

  if (error) {
    console.log("error:", error);
  }

  //Delete path
  const handleChange = (e) => {
    console.log("record id", e);
    //delete json item
    fetch("http://localhost:8000/Reseptit/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((rData) => {
        window.location.reload();
        return console.log("Record ", e + " deleted");
      });
  };

  return (
    <div>
      <h3>Safkat / reseptit</h3>
      <div className="reader">
        {rData.map((safka) => {
          return (
            <div>
              <table key={nanoid()}>
                <tbody>
                  <tr>
                  <td><strong> PVM: </strong> {safka.today} </td>
                    <td>
                      <strong> Luokitus: </strong> {safka.category}
                    </td>
                    <td>
                      <strong> Resepti: </strong> {safka.receipt}
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
