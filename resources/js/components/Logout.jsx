import React from "react";
import { Link } from "react-router-dom";
function Logout() {
    axios
        .post("/logout", {})
        .then(function (response) {
            console.log(response);
    if(response){
        window.location = "http://127.0.0.1:8000/login-page"
    }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default Logout;
