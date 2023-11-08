//includes functions to use json server

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function useGetExercices() {
  const [exercises, setexercises] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/Harjoitus")
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Could not fetch the exercises for that resource, check json server startup"
            );
          }
          return res.json();
        })
        .then((exercises) => {
          setexercises(exercises);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 1000);
  }, []);

  return exercises;
}

export function useLoadFasting(){
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/Paasto")
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Could not fetch the data for that resource, check json server startup"
            );
          }
          return res.json();
        })
        .then((data) => {
          data.map((d) => setData(d));
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 1000);
  }, []);

return data
}
