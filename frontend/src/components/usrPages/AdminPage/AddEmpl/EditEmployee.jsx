import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../../utils/axiosConfig"; // Убедитесь, что путь правильный

const EditEmployee = () => {
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await instance.get(`/employee/id/${id}`);
        const employee = response.data;
        setFullName(employee.full_name);
        setEmail(employee.e_mail);
        setPassword(employee.login_password);
      } catch (error) {
        console.error("Ошибка при получении данных сотрудника!", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSave = async () => {
    try {
      await instance.put(`/employee/id/${id}`, { 
        new_password: password,
        new_full_name: fullName,
        email: email,
        user_id: id 
      });
      navigate("/admin/employees");
    } catch (error) {
      console.error("Ошибка при обновлении данных сотрудника!", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Изменить Сотрудника</h2>
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

export default EditEmployee;
