import "../eight.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// import { Line } from './Line.ts';

const Reader = () => {
  const [data, setData] = useState([]);
  const [rData, setResepti] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

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

  if (error) {
    console.log("error:", error);
  }

  //Delete path
  const handleChange = (e) => {
    console.log("record id", e);
    //delete json item
    fetch("http://localhost:8000/Mitat/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        return console.log("Record ", e + " deleted");
      });
  };

  return (
    <div>
      <h3>8 viikon dataa</h3>

        {data.map((item) => {
          return (
            <div>
              <table id="cal" key={nanoid()}>
                <tbody>
                  <tr>
                    <td>
                      <strong> PVM: </strong> {item.today}
                    </td>
                    <td>
                      <strong> Paino: </strong> {item.paino} kg
                    </td>
                    <td>
                      <strong> Vyötärö: </strong> {item.vyotaro} cm
                    </td>
                    <td>
                      <button onClick={(e) => handleChange(item.id)}>x</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="reader--kommentti">
                      <strong> Kommentti: </strong> {item.kommentti}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p></p>
            </div>
          );
        })}
      
    </div>
  );
};

export default Reader;
