import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../utils/axiosConfig"; // Убедитесь, что путь правильный

const AddEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await instance.post("/employee/post", { employee_full_name: fullName, e_mail: email, login_password: password });
      navigate("/admin/employees");
    } catch (error) {
      console.error("Ошибка при добавлении сотрудника!", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Добавить Сотрудника</h2>
      <div>
        <label>Имя:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div>
        <label>Имейл:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default AddEmployee;
