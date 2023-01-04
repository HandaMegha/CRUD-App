import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import UsersList from "./Users/UsersList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/usersList" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default App;
