import { render } from '@testing-library/react';
import './App.css';
import Adder from './components/addDetails';
import Reader from './components/readData';
import Objectives from './components/objectives';
import './eight.css'
import CreateReceipt from './components/receipts'
import ReadReceipts from './components/readReceipts'

import {nanoid} from 'nanoid';
import { useState } from 'react';

const App = () => {
  const [obj, setObj] = useState(false)
  const [addMeasures, setAddMeasures] = useState(false)
  const [readMeasures, setReadMeasures] = useState(false)
  const [createResepti, setCreateResepti] = useState(false)
  const [readReceipts, setReadReceipts] = useState(false)
  
  const toggleReadResepti = () => {
    setReadReceipts(pre => !readReceipts)
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
    setCreateResepti(pre => !createResepti)    
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
          <label>Lisää resepti
          <input
            name="reseptiCB"
            type="checkbox"
            checked={createResepti}
            onChange={toggleResepti} 
            />   
          </label>         
          <label>Ateria historia
          <input
            name="showReceiptsCB"
            type="checkbox"
            checked={readReceipts}
            onChange={toggleReadResepti} 
            />   
          </label>                   
        </div>

        {obj && <Objectives key={nanoid()}/>}
        {addMeasures && <Adder key={nanoid()}/>}
        {readMeasures && <Reader key={nanoid()} subj = "mitat"/>}
        {createResepti && <CreateReceipt key={nanoid()}/>}        
        {readReceipts && <ReadReceipts key={nanoid()}/>}        
      </div>
  )
}


export default App;
