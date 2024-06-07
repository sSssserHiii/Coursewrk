import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import "./adminStyles.css";
import EmpList from "../../EmployeeList/EmpList"; // Убедитесь, что путь правильный

const AdminPg = () => {
  const [activeSideMenu, setActiveSideMenu] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName;
  const userRole = "administrator";

  const handleSideMenuClick = (menu) => {
    setActiveSideMenu(menu);
    if (menu === "users") {
      navigate("/admin/users");
    }
  };

  const handleTopMenuClick = (menu) => {
    setActiveTopMenu(menu);
    if (menu === "stat1") {
      navigate("/admin/employees"); // Переход на страницу сотрудников
    }
  };

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  const handleLogout = () => {
    fetch("/sign_out", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          console.error("Ошибка выхода из системы");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <div className="user-profile" onClick={toggleUserMenu}>
          <div className="user-icon"></div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">Администратор</div>
          </div>
          {userMenuVisible && (
            <ul className="user-menu">
              <li onClick={handleLogout}>Выйти</li>
            </ul>
          )}
        </div>
        <ul>
          <li onClick={() => handleSideMenuClick("inventory")}>Управление запасами</li>
          <li onClick={() => handleSideMenuClick("orders")}>Обработка заказов</li>
          <li onClick={() => handleSideMenuClick("products")}>Каталог продукции</li>
          <li onClick={() => handleSideMenuClick("suppliers")}>Управление поставщиками</li>
          <li onClick={() => handleSideMenuClick("reports")}>Отчеты и аналитика</li>
          <li onClick={() => handleSideMenuClick("users")}>Управление пользователями</li>
          <li onClick={() => handleSideMenuClick("settings")}>Настройки</li>
          <li onClick={() => handleSideMenuClick("notifications")}>Уведомления</li>
          <li onClick={() => handleSideMenuClick("feedback")}>Обратная связь</li>
          <li onClick={() => handleSideMenuClick("support")}>Поддержка</li>
        </ul>
      </nav>
      <div className="main-content">
        <nav className="topbar">
          <ul>
            <li onClick={() => handleTopMenuClick("stat1")}>Сотрудники</li>
            <li onClick={() => handleTopMenuClick("stat2")}>Товары</li>
            <li onClick={() => handleTopMenuClick("stat3")}>Статистика 3</li>
            <li onClick={() => handleTopMenuClick("stat4")}>Статистика 4</li>
            <li onClick={() => handleTopMenuClick("stat5")}>Статистика 5</li>
            <li onClick={() => handleTopMenuClick("stat6")}>Статистика 6</li>
            <li onClick={() => handleTopMenuClick("stat7")}>Статистика 7</li>
            <li onClick={() => handleTopMenuClick("stat8")}>Статистика 8</li>
            <li onClick={() => handleTopMenuClick("stat9")}>Статистика 9</li>
            <li onClick={() => handleTopMenuClick("stat10")}>Статистика 10</li>
          </ul>
        </nav>
        <div className="content">
          {activeSideMenu === "inventory" && <div>Содержание управления запасами</div>}
          {activeSideMenu === "orders" && <div>Содержание обработки заказов</div>}
          {activeSideMenu === "products" && <div>Содержание каталога продукции</div>}
          {activeSideMenu === "suppliers" && <div>Содержание управления поставщиками</div>}
          {activeSideMenu === "reports" && <div>Содержание отчетов и аналитики</div>}
          <Routes>
            <Route path="users" element={<EmpList userRole={userRole} />} />
          </Routes>
          {activeSideMenu === "settings" && <div>Содержание настроек</div>}
          {activeSideMenu === "notifications" && <div>Содержание уведомлений</div>}
          {activeSideMenu === "feedback" && <div>Содержание обратной связи</div>}
          {activeSideMenu === "support" && <div>Содержание поддержки</div>}
          {activeTopMenu === "stat1" && <div>Содержание статистики 1</div>}
          {activeTopMenu === "stat2" && <div>Содержание статистики 2</div>}
          {activeTopMenu === "stat3" && <div>Содержание статистики 3</div>}
          {activeTopMenu === "stat4" && <div>Содержание статистики 4</div>}
          {activeTopMenu === "stat5" && <div>Содержание статистики 5</div>}
          {activeTopMenu === "stat6" && <div>Содержание статистики 6</div>}
          {activeTopMenu === "stat7" && <div>Содержание статистики 7</div>}
          {activeTopMenu === "stat8" && <div>Содержание статистики 8</div>}
          {activeTopMenu === "stat9" && <div>Содержание статистики 9</div>}
          {activeTopMenu === "stat10" && <div>Содержание статистики 10</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminPg;
