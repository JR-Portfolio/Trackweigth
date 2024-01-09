export function postFetch(url, paino, vyotaro, kommentti = null) {
  console.log("Posting exercices, ", paino + ", ", vyotaro + ', ' + kommentti);

  const today = new Date().toLocaleDateString("fi-FI");
  const fToday = today.replace(".","-")

  const data = { today, paino, vyotaro, kommentti };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.location.href = "http://localhost:3000";
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}



//WIP
export function deleteExercise(e) {
  fetch("http://localhost:8000/Harjoitus/" + e, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((exercises) => {
      window.location.reload();
      return;
    });
}

