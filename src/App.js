//import { render } from '@testing-library/react';
import "./App.css";
import Main from "./components/Main";
import AddMeasures from "./components/AddMeasures";
import ReadMeasures from "./components/ReadMeasures";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./eight.css";
import { nanoid } from "nanoid";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Main key={nanoid()} />} />

            <Route
              path="/addMeasures"
              element={<AddMeasures key={nanoid()} />}
            />

            <Route
              path="/readMeasures"
              element={<ReadMeasures key={nanoid()} />}
            />
          </Routes>
        
      </BrowserRouter>
    </div>
  );
};

export default App;
