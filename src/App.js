import { render } from '@testing-library/react';
import './App.css';
import Adder from './components/addDetails';
import Reader from './components/readData';
import Objectives from './components/objectives';
import './eight.css'
import CreateCalories from './components/calories'
import ReadCalories from './components/readCalories'
import {nanoid} from 'nanoid';
import React, { useInsertionEffect, useState } from 'react';
import AddObjectives from './components/addObjectives';
import ReadObjectives from './components/readObjectives';

const App = () => {
  const [obj, setObj] = useState(false)
  const [addObj, setAddObj] = useState(false)
  const [addMeasures, setAddMeasures] = useState(false)
  const [readMeasures, setReadMeasures] = useState(false)
  const [calories, setCalories] = useState(false)
  const [readCalories, setReadCalories] = useState(false)
  

  //node test
  const helloNode = () => {
    console.log('helloNode - funktiossa')
    fetch('http://localhost:3001/api/test', {
      method:'GET',
      header:{
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(data => alert(data.message))
  }

  const toggleAddObj = () => {
    setAddObj(pre => !addObj)
  }

  const toggleReadResepti = () => {
    setReadCalories(pre => !readCalories)
  }

  const toggleObj = () => {
    setObj(pre => !obj)
  }
  const toggleAdder = () => {
    setAddMeasures(pre => !addMeasures)
  }
  const toggleReader = () => {
    setReadMeasures(pre => !readMeasures)
  }

  const toggleResepti = () => {
    setCalories(pre => !calories)    
  }
  
  return( 
      <div>
        <h1>8 viikon haaste</h1>
        <div className = "selections">
          <label>Tavoitteet
          <input
            name="objCB"
            type="checkbox"
            checked={obj}
            onChange={toggleObj} 
            />   
          </label>

          <label>Lisää tavoite
          <input
            name="addObjCB"
            type="checkbox"
            checked={addObj}
            onChange={toggleAddObj} 
            />   
          </label>

          <label>Lisää mitat
          <input
            name="addCB"
            type="checkbox"
            checked={addMeasures}
            onChange={toggleAdder} 
            />   
          </label>   
          <label>Näytä mitat
          <input
            name="readCB"
            type="checkbox"
            checked={readMeasures}
            onChange={toggleReader} 
            />   
          </label>              
          <label>Lisää kulutus
          <input
            name="reseptiCB"
            type="checkbox"
            checked={calories}
            onChange={toggleResepti} 
            />   
          </label>         
          <label>Kalori historia
          <input
            name="showReceiptsCB"
            type="checkbox"
            checked={readCalories}
            onChange={toggleReadResepti} 
            />   
          </label> 
          <input type = 'button' value="test node" onClick = {helloNode}></input>                  
        </div>

        {obj && <ReadObjectives key={nanoid()}/>}
        {addObj && <AddObjectives key={nanoid()}/>}
        {addMeasures && <Adder key={nanoid()}/>}
        {readMeasures && <Reader key={nanoid()} subj = "mitat"/>}
        {calories && <CreateCalories key={nanoid()}/>}        
        {readCalories && <ReadCalories key={nanoid()}/>}        
      </div>
  )
}


export default App;
