import React, { useState } from "react";
import axios from 'axios';

function Signup() {
    const [message, setMessage] = useState("");

    const[form,setForm] = useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        remember:false
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
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
        if (e.target.name === 'password' && e.target.value.length < 8) {
            setMessage('Password should be at least 8 characters');
        }
        else{
            setMessage();
        }
        // Password match validation
        if (e.target.name === 'password_confirmation' && e.target.value !== form.password) {
            setMessage('Passwords do not match');
        }
        // else{
        //     setMessage('');
        // }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation before submitting the form
        if (form.email === '' || form.password === '' || form.password !== form.password_confirmation || form.password.length < 8) {
            setMessage('Please fill all the fields before submitting');
        } else {
            axios.post('/register', form)
                .then(response => {
                    if(response){
                       window.location = "/home"
                        // setMessage('Registration successful!');
                    }

                })
                .catch(error => {
                    // Handle error
                    setMessage('Email already taken !');
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="container" style={{ width: "25%" }}>
            <h2> <strong>Sign Up</strong> </h2>
                <p>Please fill in this form to create an account.</p>
                {message && (
                <div class="alert alert-danger">
                    <strong>Alert!</strong> {message}
                </div>
            )}
                <label htmlFor="Name">
                    <b>Name</b>
                </label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    required
                    onChange={handleChange}
                />
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
                <span></span>
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

                <label htmlFor="password_confirmation">
                    <b>Repeat Password</b>
                </label>
                <input
                    type="password"
                    placeholder="Repeat Password"
                    name="password_confirmation"
                    required
                    onChange={handleChange}
                />

                <label>
                    <input
                        type="checkbox"
                        defaultChecked
                        name="remember"
                        onChange={handleChange}
                        style={{ marginBottom: "15px" }}
                    />{" "}
                    Remember me
                </label>

                <p>
                    By creating an account you agree to our{" "}
                    <a href="#" style={{ color: "dodgerblue" }}>
                        Terms & Privacy
                    </a>
                    .
                </p>

                <div className="clearfix">
                    <button type="submit" className="signupbtn">
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    );
}
export default Signup;