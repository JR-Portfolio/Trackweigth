//import { render } from '@testing-library/react';
import "./App.css";
import Main from "./components/Main";

import AddSafka from "./components/AddSafka";
import ReadSafka from "./components/ReadSafka";

import AddMeasures from "./components/AddMeasures";
import ReadMeasures from "./components/ReadMeasures";
import AddExercise from "./components/AddExercise";
import ReadExercise from "./components/ReadExercise";
import ReadObjectives from "./components/ReadObjectives";
import AddObjectives from "./components/AddObjectives";
import AddWkFastinge from "./components/AddWkFasting"
import ReadFasting from "./components/ReadFasting";
import Savings from "./components/Savings";
import ReadJson from "./components/ReadJson"
import { HashRouter, Route, Routes } from "react-router-dom";
import "./eight.css";
import { nanoid } from "nanoid";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main key={nanoid()} />} />


          <Route path="/addSafka" element={<AddSafka key={nanoid()} />} />

          <Route
            path="/readSafka"
            element={<ReadSafka key={nanoid()} />}
          />


          <Route path="/addMeasures" element={<AddMeasures key={nanoid()} />} />

          <Route
            path="/readMeasures"
            element={<ReadMeasures key={nanoid()} />}
          />

          <Route
            path="/addObjectives"
            element={<AddObjectives key={nanoid()} />}
          />

          <Route
            path="/readObjectives"
            element={<ReadObjectives key={nanoid()} />}
          />

          <Route path="/addExercise" element={<AddExercise key={nanoid()} />} />
          <Route path="/readExercise" element={<ReadExercise key={nanoid()} />} />

          <Route path="/addWkFasting" element={<AddWkFastinge key={nanoid()} />} />
          <Route path="/readFasting" element={<ReadFasting key={nanoid()} />} />
          <Route path="/readJson" element={<ReadJson key={nanoid()} />} />
          <Route path="/savings" element={<Savings key={nanoid()} />} />

        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
