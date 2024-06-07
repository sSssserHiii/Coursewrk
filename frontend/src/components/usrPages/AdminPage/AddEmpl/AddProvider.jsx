import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../utils/axiosConfig"; // Убедитесь, что путь правильный

const AddProvider = () => {
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await instance.post("/provider/post", { login_password: password, company, full_name_of_contact_face: fullName, e_mail: email });
      navigate("/admin/employees");
    } catch (error) {
      console.error("Ошибка при добавлении провайдера!", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Добавить Поставщика</h2>
      <div>
        <label>Пароль:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Компания:</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div>
        <label>Имя:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div>
        <label>Имейл:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default AddProvider;
