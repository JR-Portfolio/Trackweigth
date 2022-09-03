import { render } from '@testing-library/react';
import './App.css';
import Adder from './components/addDetails';
import Reader from './components/readData';
import Objectives from './components/objectives';
import './eight.css'

import {nanoid} from 'nanoid';
import { useState } from 'react';

const App = () => {
  const [showObj, setObj] = useState(false)
  const [add, setAdder] = useState(false)
  const [read, setReader] = useState(false)

  const toggleObj = () => {
    setObj(pre => !showObj)
  }
  const toggleAdder = () => {
    setAdder(pre => !add)
  }
  const toggleReader = () => {
    setReader(pre => !read)
  }

  return( 
      <div>
        <h1>8 viikon haaste</h1>
        <div className = "selections">
          <label>Tavoitteet
          <input
            name="objCB"
            type="checkbox"
            checked={false}
            onChange={toggleObj} 
            />   
          </label>
          <label>Lisää mitat
          <input
            name="addCB"
            type="checkbox"
            checked={false}
            onChange={toggleAdder} 
            />   
          </label>   
          <label>Lue recordit
          <input
            name="readCB"
            type="checkbox"
            checked={false}
            onChange={toggleReader} 
            />   
          </label>              
        </div>

        {showObj && <Objectives key={nanoid()}/>}
        {add && <Adder key={nanoid()}/>}
        {read && <Reader key={nanoid()}/>}
      </div>
  )
}


export default App;
