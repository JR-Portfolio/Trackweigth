import React from "react";
import ReactDOM from "react-dom";
import "../erno.css";
import Datetime from "react-datetime";
import Reader from './readData'

const AddDetails = () => {
  const [data, setData] = React.useState();
  const [id, setId] = React.useState();
  const [pvm, setPVM] = React.useState();
  const [paino, setPaino] = React.useState()
  const [vyotaro, setVyotaro] = React.useState()

  const openRecords = (r) => {
    console.log('openRecords - function')
    r.preventDefault();
    return <Reader/>
  }

  const onSubmit = (e) => {
    console.log('onSubmit - function')
    e.preventDefault();
    const today = new Date().toLocaleDateString('fi-FI');
    console.log('today: ', today)    
    console.log('paino:', paino)
    const record = {today, id, paino, vyotaro} 
    
    fetch("http://localhost:8000/mitat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })  
    .then(() => {
      console.log('new record added')
    })      
  };



  return (
    <div className="adder">
      <h1>8 viikon haaste</h1>

      <form onClick={onSubmit}>
        <input type="number" placeholder="id" value = {pvm} onChange={(e) => setId(e.target.value)}/>
        <input
          type="number"
          value = {vyotaro}
          onChange={(e) => setVyotaro(e.target.value)}
          placeholder="vyotaro"
        />
        <input
          type="number"
          value = {paino}
          onChange={(e) => setPaino(e.target.value)}
          placeholder="paino"
        />        
        <input type = "submit" value = "Lähetä"/>
      </form>
    </div>
  );
  };
  
export default AddDetails;
