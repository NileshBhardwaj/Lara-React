import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route, Link, BrowserRouter, Routes } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import Products from "./Products";
import Welcome_Admin from "./Welcome_Admin";
import Logout from "./Logout";
function Admin() {
    
    return (
        <>
            <BrowserRouter basename="">
                
                    <nav>
                    <ul>
                    <li>
                            <Link to="/admin"> <strong><FontAwesomeIcon icon={faUser} />Admin</strong> </Link>
                        </li>
                        <li>
                            <Link to="/product"> <strong><FontAwesomeIcon icon={faList} />Products List </strong></Link>
                        </li>
                        <li>
                <Link to="/logout"><FontAwesomeIcon icon={faSignIn} /> LogOut </Link>
            </li>
                    </ul>
                    </nav>
                
                <Routes>
                <Route path="/admin" element = {<Welcome_Admin />} />

              
            <Route path="/product" element = {<Products />} />

            <Route path="/logout" element={<Logout />} />

        </Routes>
            </BrowserRouter>
        </>
    );
}

export default Admin;
ReactDOM.createRoot(document.getElementById('admin')).render(<Admin />);