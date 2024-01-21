import "../eight.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { updateRecord } from "../common/utils";
//https://www.makeuseof.com/react-pagination-using-reactpaginate-library/
// import { Line } from './Line.ts';
import ReactPaginate from 'react-paginate'

const ReadReceipts = () => {
  const [rData, setReceipt] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [exercise, setExercise] = useState([]);
  const [sumPlusCalories, setPlusCalories] = useState(0);
  const [sumMinusCalories, setMinusCalories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  let plusList = [];
  let minusList = [];
  let sum = 0;
  let minSum = 0;

  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = rData.slice(startIndex, endIndex);

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
          setTotalPages(Math.ceil(rData.length / itemsPerPage));
        })
        .catch((err) => {
          setError(err.message);
          setPending(false);
        });
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/Harjoitus")
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Could not fetch the data for that resource, check json server startup"
            );
          }
          return res.json();
        })
        .then((rData) => {
          setExercise(rData);
        })
        .catch((err) => {
          setError(err.message);
          setPending(false);
        });
    }, 1000);
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
};

  console.log("Harjoitus data: ", exercise);

  const plusResult = rData.map((r) => {
    const curdate = new Date().toLocaleDateString("fi-FI");
    console.log("today:", r.today + ", curdate:", curdate);
    if (curdate === r.today) {
      sum += parseInt(r.plusCalories);
    }
    return sum;
  });

  const minusResult = exercise.map((e) => {
    const curdate = new Date().toLocaleDateString("fi-FI");
    console.log("today:", e.today + ", curdate:", curdate);
    if (curdate === e.today) {
      minSum += parseInt(e.lostCalories);
    }
    return minSum;
  });

  if (error) {
  }

  let savings = 2700 - (sum + minSum);

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

  //Parse date strings to the date objects
  rData.sort((a, b) => b.today - a.today);
  console.log("rData: ", rData);

  const latestReportDay = rData[rData.length - 1]?.today;
  return (
    <div className="main">
      <div className="safka--text">
        <ul>
          <li>
            {latestReportDay} päivän kalorit {sum}, kulutettuja raportoitu{" "}
            {minSum}, erotus {sum - minSum}.
          </li>
          <li>
            Päivän säästö (lukuhekellä) {savings}, oletuskulutus 2700 / pv.
          </li>
        </ul>
      </div>
      <br></br>
      <button className="main-button" onClick={() => navigate("/")}>
        Pääsivu
      </button>
      <h1 className="main-otsikko">Mittari</h1>
      <table className="taulu" key={nanoid()}>
        <thead>
          <tr key={nanoid()}>
            <th key={nanoid()}>PVM</th>
            <th key={nanoid()}>Luokitus</th>
            <th key={nanoid()}>Safka</th>
            <th key={nanoid()}>+ Kalorit</th>
            <th key={nanoid()}>- Kalorit</th>
            <th key={nanoid()}>Säästö</th>
          </tr>
        </thead>
        {rData.map((safka) => (
          <tbody key={nanoid()}>
            {safka.today.includes("2024") && (
              <>
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
              
              </>
            )}
          </tbody>
        ))}
        
      </table>
      
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage}
    />
      
    </div>
  );
};

export default ReadReceipts;
