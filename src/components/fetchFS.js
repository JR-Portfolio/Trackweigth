
//https://oauth.fatsecret.com/connect/token?user=0e3f4844a889418fb915b3223a5c3e04&password=9a30f6bbcc754a27bf80a2fefc74135f
import { useState } from "react";
import client from "../.fsdata";
//import secret from "../.fsdata"

const FetchFS = () => {
  //const [formData, setFormData] = useState({paino:"", vyotaro:""});
  const [data, setData] = useState();
  const [error, setError] = useState("");

  const client = "0e3f4844a889418fb915b3223a5c3e04"
  const secret = "9a30f6bbcc754a27bf80a2fefc74135f"

  const onSubmit = async(e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("fi-FI");
    console.log(client + ', ' + secret)
    //fetch access oauth token
      fetch("https://oauth.fatsecret.com/connect/token",{
      mode:'no-cors',
      method: "POST",
      auth: {
        user: client,
        password: secret,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "client_credentials",
        scope: "basic",
      },
      json: true,    
  });
  }

  return (
    <div>
      <h3>Tarkista ruokatarvike Fat Secretistä</h3>

      <form className="adder--form">
        <input
          type="number"
          name="ruoka"
          onChange={(e) => setData(e.target.value)}
          placeholder="Ruoka tarvike"
          value={data}
        />

        <button onClick={onSubmit}>Lisaa data</button>
      </form>
    </div>
  );
};


export default FetchFS
