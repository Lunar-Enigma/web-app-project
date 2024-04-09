import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:5000/register', { name, email, password })
      .then(response => {
        console.log("Submitted:", name, email, password);
        navigate("/login")
      })
      .catch(err => {
        console.log(err);
      });
  }
  

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="formInput"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          value={name}
        />
        <input
          className="formInput"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <input
          className="formInput"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
}

export default Register;
