// src/components/EmployeeTable/EmployeeTable.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../utils/axiosConfig"; // Убедитесь, что путь правильный

import "./stylesTable.css";

const EmployeeTable = () => {
  const [users, setUsers] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false); // Состояние для управления видимостью меню
  const [selectedUser, setSelectedUser] = useState(null); // Состояние для отслеживания выбранного пользователя
  const navigate = useNavigate();

  const handlePlusClick = () => {
    setMenuVisible(!menuVisible); // Переключение видимости меню
  };

  const handleUserClick = (user) => {
    setSelectedUser(selectedUser === user ? null : user); // Переключение видимости меню пользователя
  };

  const handleEditUser = (user) => {
    if (user.category === 'provider'){
        navigate(`/edit-provider/${user.provider_id}`);

    }else{
        navigate(`/edit-employee/${user.employee_id}`);

    }

};

  const handleDeleteUser = async (user) => {
    try {
      const id = user.category === 'provider' ? user.provider_id : user.employee_id;
      const url = user.category === 'provider' ? `/provider/id/${id}` : `/employee/id/${id}`;
      
      await instance.delete(url); // Запрос на удаление пользователя
      setUsers(users.filter((u) => u.id !== user.id)); // Обновление состояния пользователей
    } catch (error) {
      console.error("Ошибка при удалении пользователя!", error);
    }
  };

  useEffect(() => {
    // Получение данных о сотрудниках и провайдерах
    const fetchData = async () => {
      try {
        const [employeeResponse, providerResponse] = await Promise.all([
          instance.get("/employee/get"),
          instance.get("/provider/getall"),
        ]);

        if (employeeResponse.data && employeeResponse.data.rows) {
          setUsers(employeeResponse.data.rows);
        }

        if (providerResponse.data && providerResponse.data.rows) {
          const providers = providerResponse.data.rows.map((provider) => ({
            ...provider,
            category: "provider",
          }));
          setUsers((prevUsers) => [...prevUsers, ...providers]);
        }
      } catch (error) {
        console.error("Ошибка при получении данных сотрудников и провайдеров!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="employee-table-container">
      <button className="back-button" onClick={() => navigate("/admin")}>Главное меню</button>
      <div className="selection-box">Выберите сотрудника</div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>
              <button onClick={handlePlusClick}>+</button> {/* Плюсик для открытия меню */}
              {menuVisible && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate("/add-employee")}>Добавить сотрудника</button>
                  <button onClick={() => navigate("/add-provider")}>Добавить поставщика</button>
                </div>
              )}
            </th>
            <th>Имя Фамилия</th>
            <th>Имейл</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td>{user.id}</td> {/* Итерация сотрудников */}
              <td>{user.full_name}</td>
              <td>{user.e_mail}</td>
              <td>{user.category}</td>
              {selectedUser === user && (
                <td className="dropdown-menu">
                  <button onClick={() => handleEditUser(user)}>Изменить</button>
                  <button onClick={() => handleDeleteUser(user)}>Удалить</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
