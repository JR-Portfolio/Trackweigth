import "../eight.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// import { Line } from './Line.ts';

const ReadObjectives = () => {
  const [obj, setObj] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [sumPlusCalories, setPlusCalories] = useState(0)
  const [sumMinusCalories, setMinusCalories] = useState(0)

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
    console.log("record id", e);
    //delete json item
    fetch("http://localhost:8000/Tavoitteet/" + e, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((obj) => {
        window.location.reload();
        return console.log("Record ", e + " deleted");
      });
  };


  return (
    <div>
      {!obj && <h3>Ei asetettuja tavoitteita<p/></h3>}
    
      <div className="reader">      

        {obj.map(o => {
          return(
            <div>
              {obj && <table id="cal" key={nanoid()}>
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
