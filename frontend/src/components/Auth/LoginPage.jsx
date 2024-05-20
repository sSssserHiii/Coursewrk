import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post("/auth/sign_in", { username: login, password, role });
      console.log("Response:", response);

      // Проверка, что response.data содержит role
      if (response.data && response.data.role) {
        const userRole = response.data.role;
        console.log("User role:", userRole);

        if (userRole === "provider") {
          navigate("/provider");
        } else if (userRole === "employeeuser") {
          navigate("/employee");
        } else if (userRole === "administrator") {
          navigate("/admin");
        } else {
          setError("Unknown role");
        }
      } else {
        setError("Role not found in response");
        console.error("Role not found in response", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid username or password");
    }
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
          <option>Provider</option>
          <option>Employee</option>
          <option>Administrator</option>
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



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios" 
// import "./authPages.css";

// const LoginPage = () => {

//   const [error, setError] = useState("");

//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("Provider");



//   const instance = axios.create({
//     baseURL: "http://localhost:3001",
//     withCredentials: true,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//   });
  

//   const navigate = useNavigate();

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     const response = await instance.post("/auth/sign_in", { username: login, password, role });
//   //     console.log(response);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await instance.post("/auth/sign_in", { username: login, password, role });
//       console.log(response);
      
//       const userRole = response.data.role; // получаем роль пользователя из ответа
//       if (userRole === "Provider") {
//         navigate("/provider");
//       } else if (userRole === "Employee") {
//         navigate("/employee");
//       } else if (userRole === "Administrator") {
//         navigate("/admin");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="parent-container">
//       <form className="auth-container" onSubmit={handleSubmit}>
//         <h2 className="auth-header">Login</h2>
//         <span className="auth-error">{error}</span>
//         <input
//           className={login ? "auth-input valid" : "auth-input"}
//           type="text"
//           placeholder="Login"
//           value={login}
//           onChange={(e) => setLogin(e.target.value)}
//         />
//         <input
//           className={password ? "auth-input valid" : "auth-input"}
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <select onChange={(e) => setRole(e.target.value)}>
//           <option>
//           Provider
//           </option>
//           <option>
//             Employee
//           </option>
//           <option>
//             Administrator
//           </option>
//         </select>
//         <button
//           disabled={!(login && password)}
//           className={login && password ? "submit-btn active" : "submit-btn"}
//         >
//           Log in
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;