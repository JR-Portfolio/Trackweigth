import React, { useEffect, useState } from "react";

export default function Savings() {
  const [safka, setSafka] = useState(null);

  //Fetch all
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
          setSafka(rData);
        })
        .catch((err) => {});
    }, 1000);
  }, []);


  //formula
  const saveArr = safka?.map((s) => {
    if (!s.savings) {
      s.savings = 0;
    }
    return s.savings;
  });
  const saveSum = saveArr?.reduce((acc, val) => acc + val, 0);

  console.log("Saved: ", saveSum + " in kcal, which convert into ", saveSum/7000 + " kg");

  return (
    <>
      <h1 className = "savings">Savings from start {saveSum/7000} kg</h1>
    </>
  );
}
