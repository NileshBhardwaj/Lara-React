import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        // Email validation
        if (e.target.name === "uname") {
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+com))$/;
            if (!re.test(String(e.target.value).toLowerCase())) {
                setMessage("Invalid email address");
            } else {
                setMessage("");
            }
        }

        // Password length validation
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.uname === "" || form.psw === "") {
            setMessage("Please correct the errors before submitting");
        } else {
            axios
                .post("/log", form)
                .then((response) => {
                    console.log(response);

                    if (response) {
                        console.log(response);
                        window.location = response.data.location;
                    }
                })
                .catch((error) => {
                    // Handle error
                    setMessage("Invalid Cradentials !");
                });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>
                    {" "}
                    <strong>Login</strong>{" "}
                </h2>
                <div className="container" style={{ width: "25%" }}>
                    <label htmlFor="uname">
                        <b>Email</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name="email"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="psw">
                        <b>Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        required
                        onChange={handleChange}
                    />
                    {message && (
                        <div class="alert alert-danger">
                            <strong>Alert!</strong> {message}
                        </div>
                    )}
                    <button id="log-button" type="submit">
                        {" "}
                        <strong>Login</strong>{" "}
                    </button>
                    <label>
                        <input type="checkbox" defaultChecked name="remember" />{" "}
                        Remember me
                    </label>
                </div>
            </form>
        </>
    );
}
export default Login;
