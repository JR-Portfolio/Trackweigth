import React, { useState, useEffect, useRef } from "react";
import "../eight.css";
import { useNavigate } from "react-router-dom";
import ConfirmationDialogue from "./ConfirmationDialogue";
import { postFetch } from "../common/utils";

const AddFasting = () => {
  const selectedValue = useRef("");
  const [main, setMain] = useState(true);
  const firstRef = useRef(new Date());
  const firstEndRef = useRef(new Date());
  const [confirmation, setConfirmation] = useState(false);
  const [paasto, setPaasto] = useState([]);

  const [wk, setWeek] = useState(null);
  const [preWk, setPreWeek] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let sum = 0;

  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
    );
    setWeek(weekNumber);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/Paasto")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((d) => setPreWeek(d.wk));
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const getFastingSum = (s) => {
    let sum = 0;
    return sum;
  };

  const onSubmit = (e) => {
    if (preWk === wk) {
      alert(`No can do bro, you already have a record from wk ${wk}`);
      return;
    } else {
      e.preventDefault();
      postFetch("http://localhost:8000/Paasto", wk, paasto);
    }

    function adder(eka, toka) {
      setPaasto((paasto) => [...paasto, { alku: eka, loppu: toka }]);
    }

    const handleConfirm = () => {
      setConfirmation(true);
      setMain(false);
      //onSubmit();
    };

    const handleCancel = () => {
      // Handle the cancellation action here
      setConfirmation(false);
      setMain(true);
    };

    return (
      <>
        {main && (
          <div className="main paasto">
            <button className="main-button" onClick={() => navigate("/")}>
              Pääsivu
            </button>

            <h1 className="main-otsikko">Viikon {wk} paasto pläni</h1>

            <form>
              <div className="paasto--item">
                <label>
                  Alku
                  <input ref={firstRef} type="datetime-local" />
                </label>
                <span id="space">-</span>

                <label>
                  Loppu
                  <input ref={firstEndRef} type="datetime-local" />
                </label>
                <button
                  onClick={() =>
                    adder(firstRef.current.value, firstEndRef.current.value)
                  }
                >
                  {" "}
                  +
                </button>
              </div>

              <button className="main-button" onClick={handleConfirm}>
                Tarkista
              </button>
            </form>
          </div>
        )}

        {confirmation && !main && (
          <ConfirmationDialogue
            week={wk}
            message={paasto}
            onConfirm={onSubmit}
            onCancel={handleCancel}
          />
        )}
      </>
    );
  };
};

export default AddFasting;
