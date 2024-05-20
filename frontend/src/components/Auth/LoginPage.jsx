import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios" 
import "./authPages.css";

const LoginPage = () => {

  const [error, setError] = useState("");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Provider");



  const instance = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  

  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await instance.post("/auth/sign_in", { username: login, password, role });
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleSubmit = async (event) => {

    event.preventDefault();
  //  const response = await axios.post("/auth/sign_in", {username: login , password, role});
    //fetch("http:/localhost:3001/auth/sign_in", {method:"POST"}).then(r => console.log(r));
    instance.post("/auth/sign_in", {username: login , password, role}).then(r => console.log(r));
    
  };

  return (
    <div className="parent-container">
      <form className="auth-container" onSubmit={handleSubmit}>
        <h2 className="auth-header">Login</h2>
        <span className="auth-error">{error}</span>
        <input
          className={login ? "auth-input valid" : "auth-input"}
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className={password ? "auth-input valid" : "auth-input"}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)}>
          <option>
          Provider
          </option>
          <option>
            Employee
          </option>
          <option>
            Administrator
          </option>
        </select>
        <button
          disabled={!(login && password)}
          className={login && password ? "submit-btn active" : "submit-btn"}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;