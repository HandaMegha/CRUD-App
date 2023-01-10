import React from "react";
import "./home.css";
import { Link } from "react-router-dom"; 
import { Icon } from "semantic-ui-react";

const Home = () => {
    return(
        <div className="bg">
            <Link to="/usersList" className="users-link"> <Icon name="user" /> Users </Link>
        </div>
    )
}

export default Home;