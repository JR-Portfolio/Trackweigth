import "../eight.css";
import { render, useEffect, useState } from "react";
import Adder from "./addDetails";
import { nanoid } from "nanoid";

const Reader = () => {
  const [data, setData] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/mitat")
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Could not fetch the data for that resource, check json server startup"
            );
          }
          return res.json();
        })
        .then((data) => {
          console.log("readData data:", data);
          setData(data);
          setPending(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setPending(false);
        });
    }, 1000);
  }, []);

  console.log("data: ", data);

  if (error) {
    console.log("error:", error);
  }

  const erno = data.map((item) => item);

  return (
    <div className="reader">
      <h3>8 viikon dataa</h3>
      {data.map((item) => {
        return (
          <table key={nanoid()}>
            <tbody>
              <tr>
                <td> <strong> PVM: </strong> {item.today} </td>
                <td> <strong> Paino: </strong> {item.paino} kg </td>
                <td> <strong> Vyötärö: </strong> {item.vyotaro} cm </td>
              </tr>
            </tbody>
          </table>
        );
      })}

  
    </div>
  );
};

export default Reader;
