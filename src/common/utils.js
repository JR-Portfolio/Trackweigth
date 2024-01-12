export function postFetch(url, data) {
  
  const today = new Date().toLocaleDateString("fi-FI");
  
  //const data = { today, paino, vyotaro, kommentti };
  data.today = today;
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
export function deleteItem(url, e) {
  console.log(url, e)
  fetch(url + e, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("delete response: ", data)
      window.location.reload();
      return;
    });
}

