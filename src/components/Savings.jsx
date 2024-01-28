import React, { useEffect, useState } from "react";

export default function Savings() {
  const [harjoitus, setHarjoitus] = useState(null);
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

  //Fetch all
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
          setHarjoitus(rData);
        })
        .catch((err) => {});
    }, 1000);
  }, []);

  //formula

  let gainSum = 0;
  const saveArr = safka?.map((s) => {
    if (!s.savings) {
      s.savings = 0;
    }
    return s.savings;
  });
  const saveSum = saveArr?.reduce((acc, val) => acc + val, 0);

  console.log("Saved: ", saveSum + " in kcal, which convert into ", saveSum/7000 + " kg");

  /*let reductionSum = 0;
  const rSum = harjoitus?.map((h) => h.lostCalories)
  const energyLost = rSum?.reduce((acc, val)=>acc + val, 0)





console.log("Gained:", gSum)
console.log("Lost:",  energyLost)
//console.log("How many: ", safka.length);

const saves = (2700 * safka?.length) - (gSum - energyLost)

console.log("Savings: ", parseInt(saves)/7)
*/
  return (
    <>
      <h1 className = "savings">Savings from start {saveSum/7000} kg</h1>
    </>
  );
}
