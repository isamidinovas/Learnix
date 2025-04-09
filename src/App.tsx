import React from "react";
import { Routes, Route } from "react-router-dom";
import { routeArray } from "./Routes/routes";
import "./App.css";

const App: React.FC = () => {
  const routes = routeArray.map((r) => (
    <Route key={r.path} path={r.path} element={<r.page />} />
  ));
  return (
    <div className="App">
      <Routes>{routes}</Routes>
    </div>
  );
};

export default App;
