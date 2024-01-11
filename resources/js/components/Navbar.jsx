import React from "react";
import ReactDOM from "react-dom/client" 
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route, Link, BrowserRouter, Routes } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Logout from "./Logout";
import Analytics from "./Analytics";
import Cart from "./Cart";
import Thankyou from "./Thankyou";
import Checkout from "./Checkout";


function MyApp() {
 

    return( 
    <BrowserRouter basename="">
        <nav>
        <ul>
            <li>
                <Link to="/home"><FontAwesomeIcon icon={faHome} /> Home </Link>
            </li>

            <li>
                <Link to="/contact"> Contact </Link>
            </li>
            
            <li>
                <Link to="/analytics">Analytics </Link>
            </li>
            <li>
                <Link to="/about"> About </Link>
            </li>
            <li>
                <Link to="/logout"><FontAwesomeIcon icon={faSignIn} /> LogOut </Link>
            </li>
            <li>
                <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /> Cart </Link>
            </li>
            {/* <li >
                <Link to="/thankyou"><FontAwesomeIcon icon={faShoppingCart} /> Thankyou </Link>
            </li> */}

        </ul>
        </nav>
    
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
           
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/about" element={<About />} />
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
      
    </BrowserRouter>
    
    );
}
// ReactDOM.createRoot(document.getElementById('app')).render(<MyApp/>);
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);
