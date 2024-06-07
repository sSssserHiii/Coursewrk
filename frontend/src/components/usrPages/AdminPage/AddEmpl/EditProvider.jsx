import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../../utils/axiosConfig"; // Убедитесь, что путь правильный

const EditProvider = () => {
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await instance.get(`/provider/id/${id}`);
        const provider = response.data;
        setFullName(provider.full_name);
        setEmail(provider.e_mail);
        setPassword(provider.login_password);
        setCompany(provider.company);
      } catch (error) {
        console.error("Ошибка при получении данных поставщика!", error);
      }
    };

    fetchProvider();
  }, [id]);

  const handleSave = async () => {
    try {
      await instance.put(`/provider/id/${id}`, {
        new_password: password,
        company: company,
        new_full_name: fullName,
        email: email,
        user_id: id
      });
      navigate("/admin/providers");
    } catch (error) {
      console.error("Ошибка при обновлении данных поставщика!", error);
    }
  };

  return (
    <div className="form-container-provider">
      <h2>Изменить Поставщика</h2>
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

export default EditProvider;
