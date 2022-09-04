import "../eight.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// import { Line } from './Line.ts';

const ReadReceipts = () => {
  const [rData, setReceipt] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [sumPlusCalories, setPlusCalories] = useState()
  const [sumMinusCalories, setMinusCalories] = useState()

  let plusList = []
  let minusList = []
  let sum = 0;
  let minusSum = 0;

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
          console.log("Resepti data:", rData);
          setReceipt(rData);
          setPending(false);
          setError(null);
          
          plusList = rData.filter(({ plusCalories }) => {
            console.log('plusList plusCalories:', plusCalories)
            sum += parseInt(plusCalories);
            console.log('Sum:', sum)
            setPlusCalories(sum)
            return plusCalories > 0;
          });
          minusList = rData.filter(({ lostCalories }) => {
            console.log('lostList lostCalories:', lostCalories)
            minusSum += parseInt(lostCalories);
            console.log('Sum of lost calories:', minusSum)
            setMinusCalories(minusSum)
            return lostCalories > 0;
          });

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

  console.log("sum of plusCalories: ", plusList)

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
      <h3>Safkat / reseptit<p/></h3>
      <h4>Hankittujen kaloreiden summa {sumPlusCalories}, kulutettujen kaloreiden summa {sumMinusCalories}</h4>
    
      <div className="reader">
        {rData.map((safka) => {
      
          return (
            <div>
              <table key={nanoid()}>
                <th>PVM</th><th>Luokitus</th><th>Nautittu</th><th>+ kalorit</th><th>- kalorit</th><th>Erotus</th>
                <tbody>
                  <tr>
                  <td>{safka.today}</td>
                    <td>{safka.category}</td>
                    <td>{safka.receipt}</td>
                    <td>{safka.plusCalories}</td>
                    <td>{safka.lostCalories}</td>
                    <td>{safka.diff}</td>
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
