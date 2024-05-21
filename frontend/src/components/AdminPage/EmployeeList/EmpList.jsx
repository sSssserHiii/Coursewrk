import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./empListStyle.css";



// const instance = axios.create({
//     baseURL: "http://localhost:3001",
//     withCredentials: true,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//   });

//const response = await instance.post("/auth/sign_in", { username: login, password, role });
     

const EmpList = () => {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/user/get") // Измените URL на ваш эндпоинт для получения списка пользователей
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
  };
  
  export default EmpList;