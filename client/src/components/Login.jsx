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
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.data === "Success") {
        navigate("/home");
      } else if (response.data === "Invalid Password") {
        alert("Incorrect Password! Please try again.");
      } else {
        alert("User does not exist! Please sign up first.");
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
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
}

export default Login;
