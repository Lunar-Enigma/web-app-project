import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.text();
      if(data === "Missing Fields"){
        alert("Please fill out all fields.")
      }else if (data === 'Success') {
        navigate("/home");
      } else if (data === 'Failed') {
        alert("Incorrect Password!");
      } else {
        alert("User does not exist");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };
  

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="formInput"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          required
        />
        <input
          className="formInput"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          required
        />
        <button type="submit" className="logres">Submit</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register"><button className="logres">Register</button></Link>
    </div>
  );
}

export default Login;
