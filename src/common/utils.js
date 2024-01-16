//import { Navigate, useNavigate } from "react-router-dom";

export function postFetch(url, data) {
  //const navigate = useNavigate();
  const today = new Date().toLocaleDateString("fi-FI");

  //const data = { today, paino, vyotaro, kommentti };
  data.today = today;
  console.log("url: ", url);
  fetch(url, {
    method: "POST",
    //mode: 'no_cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.open("http://localhost:3000","_self")
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

//WIP
export function deleteItem(url, e) {
  console.log(url, e);
  fetch(url + e, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("delete response: ", data);
      window.location.reload();
      return;
    });
}
