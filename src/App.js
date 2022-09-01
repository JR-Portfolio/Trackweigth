import { render } from '@testing-library/react';
import './App.css';
import Adder from './components/addDetails';
import Reader from './components/readData';
import {nanoid} from 'nanoid';

function App() {

  return( 
      <div>
        <Adder key={nanoid()}/>
        <Reader key={nanoid()}/>
      </div>
  )
}


export default App;
