import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./userPageStyles.css"; // Создайте стили для этой страницы

const UserPage = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const navigate = useNavigate();

  // Функция для фильтрации пользователей по ролям
  const filterUsersByRole = (role) => {
    const filtered = users.filter(user => user.role === role);
    setFilteredUsers(filtered);
  };

  // Вернуть всех пользователей
  const resetFilter = () => {
    setFilteredUsers(users);
  };

  return (
    <div className="user-page">
      <div className="user-info">
        <div className="user-icon"></div>
        <div className="user-details">
          <div className="user-name">{userName}</div>
          <div className="user-role">Administrator</div>
        </div>
      </div>
      <div className="user-actions">
        <button onClick={() => navigate("/admin")} className="back-button">Back to Admin Dashboard</button>
        <div className="filter-buttons">
          <button onClick={() => filterUsersByRole("role1")}>Role 1</button>
          <button onClick={() => filterUsersByRole("role2")}>Role 2</button>
          <button onClick={() => filterUsersByRole("role3")}>Role 3</button>
          <button onClick={() => resetFilter()}>Show All</button>
        </div>
      </div>
      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-block">
            <div>{user.name}</div>
            <div>{user.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
// import React from "react";
// import "./empListStyle.css";

// const EmpList = ({ users, providers }) => {
//   return (
//     <div>
//       <h2>Employees</h2>
//       {Array.isArray(users) && users.length > 0 ? (
//         users.map((user) => (
//           <div key={user.employee_id}>{user.employee_full_name}</div>
//         ))
//       ) : (
//         <div>No users available</div>
//       )}
      
//       <h2>Providers</h2>
//       {Array.isArray(providers) && providers.length > 0 ? (
//         providers.map((provider) => (
//           <div key={provider.provider_id}>{provider.provider_name}</div>
//         ))
//       ) : (
//         <div>No providers available</div>
//       )}
//     </div>
//   );
// };

// export default EmpList;



