import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route, Link, BrowserRouter, Routes } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import User from "./User";

function Welcome() {
    
    return (
        <>
            <BrowserRouter basename="">
                
                    <nav>
                    <ul>
                        <li>
                            <Link to="/login-page"> <strong>Login </strong></Link>
                        </li>
                        <li>
                            <Link to="/signup-page"> <strong>Signup</strong> </Link>
                        </li>
                    </ul>
                    </nav>
                
                <Routes>

                <Route path="/" element = {<User />} />
            <Route path="/login-page" element = {<Login />} />

            <Route path="/signup-page" element = {<Signup />} />

        </Routes>
            </BrowserRouter>
        </>
    );
}

export default Welcome;
ReactDOM.createRoot(document.getElementById('welcome')).render(<Welcome />);