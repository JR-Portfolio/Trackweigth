import { useState } from "react";
//import client from "../.fsdata";
//import secret from "../.fsdata";

const FetchFS = () => {
  //const [formData, setFormData] = useState({paino:"", vyotaro:""});
  const [data, setData] = useState();
  const [error, setError] = useState("");

  /*Get authentication token
  const getAuth = async () => {
    await fetch("https://oauth.fatsecret.com/connect/token", {
      mode: "no-cors",
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
  };
*/
  //Modify token to be usable with FS method.
  /*var auth = getAuth();
  var bearerAuth = "Bearer " + auth;
*/
  //Fetch data
  /*
    POST https://platform.fatsecret.com/rest/server.api
    Content-Type: application/json
    Header: Authorization: Bearer <Access Token>
    Parameters: method=foods.search&search_expression=toast&format=json
    */

  const getFoodResp = async () => {
    fetch("https://platform.fatsecret.com/rest/server.api", {
      method: "POST",
      headers: {
        //Authorization: bearerAuth,
        "Content-Type": "application/json",
      },
      body: "foods.search&search_expression=toast&format=json",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("fi-FI");
    //getAuth();
    getFoodResp();
  };

  return (
    <div>
      <h3>Tarkista ruokatarvike Fat Secretistä</h3>

      <form className="adder--form">
        <input
          type="number"
          name="ruoka"
          onChange={(e) => setData(e.target.value)}
          placeholder="Ruoka tarvike"
        />

        <button onClick={onSubmit}>Lisaa data</button>
      </form>
    </div>
  );
};

export default FetchFS;
