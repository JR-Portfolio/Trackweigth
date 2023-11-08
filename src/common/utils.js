export function postFetch(url, item, item2, item3 = null, item4 = null) {
  console.log("Posting exercices, ", item + ", ", item2 + ', ' + item3 + ', ' + item4);

  const today = new Date().toLocaleDateString("fi-FI");

  const data = { today, item, item2, item3, item4 };

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

