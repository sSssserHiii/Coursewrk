import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axiosConfig"; // Убедитесь, что путь правильный

import "./empListStyle.css";

const EmpList = ({userRole}) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Получение данных о сотрудниках
    instance.get("/employee/get")
    .then(response => {
      console.log("Ответ API сотрудников:", response.data); // Проверка ответа

      if (response.data && response.data.rows) {
        setUsers(response.data.rows); // Обновление состояния данными сотрудников
        setSortedUsers(response.data.rows); // Инициализация sortedUsers
      } else {
        console.error("Неожиданный формат ответа", response.data);
      }
    }).catch(error => {
      console.error("Ошибка при получении данных сотрудников!", error);
    });

  // Получение данных о провайдерах
  instance.get("/provider/getall")
    .then(response => {
      console.log("Ответ API провайдеров:", response.data); // Проверка ответа

      if (response.data && response.data.rows) {
        const providers = response.data.rows.map(provider => ({
          ...provider,
          category: "provider" // Добавьте категорию для провайдеров
        }));
        setUsers(prevUsers => [...prevUsers, ...providers]);
        setSortedUsers(prevUsers => [...prevUsers, ...providers]);
      } else {
        console.error("Неожиданный формат ответа", response.data);
      }
    })
    .catch(error => {
      console.error("Ошибка при получении данных провайдеров!", error);
    });
}, []);

useEffect(() => {
  // Устанавливаем начальную фильтрацию в зависимости от роли пользователя
  if (userRole === "provider" || userRole === "employeeuser" || userRole ==="administrator") {
    sortUsersByRole(userRole);
  }
}, [userRole, users]);

const sortUsersByRole = (role) => {
  if(role != 'administrator'){

    const filtered = users.filter(user => user.category === role);
  setSortedUsers(filtered);
  }
};

  const resetSort = () => {
    setSortedUsers(users);
  };
  const handleBackButtonClick = () => {
    if (userRole === "provider") {
      navigate("/provider");
    } else if (userRole === "employeeuser") {
      navigate("/employee");
    } else {
      navigate("/admin");
    }
  };
  return (
    <div className="user-management-page">
      <button className="back-button" onClick={handleBackButtonClick}>Главная страница</button>
      <h2>Управление пользователями</h2>
      <div className="sort-buttons">
        <button onClick={() => sortUsersByRole("provider")}>Провайдер</button>
        <button onClick={() => sortUsersByRole("employeeuser")}>Работник склада</button>
        <button onClick={resetSort}>Показать всех</button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Имя Фамилия</th>
            <th>Имейл</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
                <td>{user.full_name}</td> {/* Изменено имя поля */}
              <td>{user.e_mail}</td> {/* Убедитесь, что это поле содержит email, если это не так, замените на правильное поле */}
              <td>{user.category}</td> {/* Обратите внимание на имя поля */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpList;
