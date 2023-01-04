import React from "react";
import "./home.css";
import { Link } from "react-router-dom"; 

const Home = () => {
    return(
        <div>
            <h2> Home Page </h2>
            <Link to="/usersList"> Users List </Link>
            {/* <Link to="/addList"> AddUser List </Link> */}
        </div>
    )
}

export default Home;