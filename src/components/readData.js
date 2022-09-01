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

  console.log("erno: ", erno);

  const handleSave = (a) => {
    console.log("handleSave funkkari");
    return <Adder />;
  };

  return (
    <div className="reader">
      <h3>8 viikon dataa</h3>
      {data.map((item) => {
        return (
          <li key={nanoid()}>
            <strong> PVM: </strong>
            {item.today} -<strong> Paino: </strong> {item.paino} kg -
            <strong> Vyötärö: </strong> {item.vyotaro} cm
          </li>
        );
      })}

  
    </div>
  );
};

export default Reader;
