import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import UsersList from "./Users/UsersList";
import AddEditUser from "./Users/AddEditUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/usersList" element={<UsersList />} />
        <Route path="/addUser" element={<AddEditUser />} />
        <Route path="/editUser/:id" element={<AddEditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
