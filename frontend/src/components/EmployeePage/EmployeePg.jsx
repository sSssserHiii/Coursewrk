// src/components/EmployeeDashboard/EmployeeDashboard.jsx
import React, { useState } from "react";
import "./employeeStyles.css";

const EmployeePg = () => {
  const [activeSideMenu, setActiveSideMenu] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const handleSideMenuClick = (menu) => {
    setActiveSideMenu(menu);
  };

  const handleTopMenuClick = (menu) => {
    setActiveTopMenu(menu);
  };

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  const handleLogout = () => {
    console.log("Logged out");
    // Add your logout logic here
  };

  return (
    <div className="employee-dashboard">
      <nav className="sidebar">
        <div className="user-profile" onClick={toggleUserMenu}>
          <div className="user-icon"></div>
          <div className="user-info">
            <div className="user-name">Jane Smith</div>
            <div className="user-role">Employee</div>
          </div>
          {userMenuVisible && (
            <ul className="user-menu">
              <li onClick={handleLogout}>Log out</li>
            </ul>
          )}
        </div>
        <ul>
          <li onClick={() => handleSideMenuClick("tasks")}>Task Management</li>
          <li onClick={() => handleSideMenuClick("projects")}>Project Overview</li>
          <li onClick={() => handleSideMenuClick("calendar")}>Calendar</li>
          <li onClick={() => handleSideMenuClick("messages")}>Messages</li>
          <li onClick={() => handleSideMenuClick("reports")}>Reports</li>
          <li onClick={() => handleSideMenuClick("profile")}>Profile</li>
          <li onClick={() => handleSideMenuClick("settings")}>Settings</li>
        </ul>
      </nav>
      <div className="main-content">
        <nav className="topbar">
          <ul>
            <li onClick={() => handleTopMenuClick("stat1")}>Daily Stats</li>
            <li onClick={() => handleTopMenuClick("stat2")}>Weekly Stats</li>
            <li onClick={() => handleTopMenuClick("stat3")}>Monthly Stats</li>
          </ul>
        </nav>
        <div className="content">
          {activeSideMenu === "tasks" && <div>Task Management Content</div>}
          {activeSideMenu === "projects" && <div>Project Overview Content</div>}
          {activeSideMenu === "calendar" && <div>Calendar Content</div>}
          {activeSideMenu === "messages" && <div>Messages Content</div>}
          {activeSideMenu === "reports" && <div>Reports Content</div>}
          {activeSideMenu === "profile" && <div>Profile Content</div>}
          {activeSideMenu === "settings" && <div>Settings Content</div>}
          {activeTopMenu === "stat1" && <div>Daily Stats Content</div>}
          {activeTopMenu === "stat2" && <div>Weekly Stats Content</div>}
          {activeTopMenu === "stat3" && <div>Monthly Stats Content</div>}
        </div>
      </div>
    </div>
  );
};

export default EmployeePg;
