import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import "./adminStyles.css";
import EmpList from "./EmployeeList/EmpList";
import instance from "../../utils/axiosConfig";

const AdminPg = () => {
  const [activeSideMenu, setActiveSideMenu] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [users, setUsers] = useState([]); // Ensure initial state is an array
  const [providers, setProviders] = useState([]); // State for providers
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName;

  useEffect(() => {
    // Fetching employee data
    instance.get("/user/get")
      .then(response => {
        console.log("Employee API response:", response.data); // Check the response

        if (response.data && response.data.rows) {
          setUsers(response.data.rows); // Update state with employee data
        } else {
          console.error("Unexpected response format", response.data);
        }
      }).catch(error => {
        console.error("There was an error fetching the employees!", error);
      });

    // Fetching provider data
    instance.get("/provider/getall")
      .then(response => {
        console.log("Provider API response:", response.data); // Check the response

        if (response.data && response.data.rows) {
          setProviders(response.data.rows); // Update state with provider data
        } else {
          console.error("Unexpected response format", response.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the providers!", error);
      });
  }, []);

  const handleSideMenuClick = (menu) => {
    setActiveSideMenu(menu);
    if (menu === "users") {
      navigate("/admin/users");
    }
  };

  const handleTopMenuClick = (menu) => {
    setActiveTopMenu(menu);
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
          console.error("Failed to sign out");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <div className="user-profile" onClick={toggleUserMenu}>
          <div className="user-icon"></div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">Administrator</div>
          </div>
          {userMenuVisible && (
            <ul className="user-menu">
              <li onClick={handleLogout}>Log out</li>
            </ul>
          )}
        </div>
        <ul>
          <li onClick={() => handleSideMenuClick("inventory")}>Inventory Management</li>
          <li onClick={() => handleSideMenuClick("orders")}>Order Processing</li>
          <li onClick={() => handleSideMenuClick("products")}>Product Catalog</li>
          <li onClick={() => handleSideMenuClick("suppliers")}>Supplier Management</li>
          <li onClick={() => handleSideMenuClick("reports")}>Reports and Analytics</li>
          <li onClick={() => handleSideMenuClick("users")}>User Management</li>
          <li onClick={() => handleSideMenuClick("settings")}>Settings</li>
          <li onClick={() => handleSideMenuClick("notifications")}>Notifications</li>
          <li onClick={() => handleSideMenuClick("feedback")}>Feedback</li>
          <li onClick={() => handleSideMenuClick("support")}>Support</li>
        </ul>
      </nav>
      <div className="main-content">
        <nav className="topbar">
          <ul>
            <li onClick={() => handleTopMenuClick("stat1")}>Add new Employee</li>
            <li onClick={() => handleTopMenuClick("stat2")}>Add new Item</li>
            <li onClick={() => handleTopMenuClick("stat3")}>Statistic 3</li>
            <li onClick={() => handleTopMenuClick("stat4")}>Statistic 4</li>
            <li onClick={() => handleTopMenuClick("stat5")}>Statistic 5</li>
            <li onClick={() => handleTopMenuClick("stat6")}>Statistic 6</li>
            <li onClick={() => handleTopMenuClick("stat7")}>Statistic 7</li>
            <li onClick={() => handleTopMenuClick("stat8")}>Statistic 8</li>
            <li onClick={() => handleTopMenuClick("stat9")}>Statistic 9</li>
            <li onClick={() => handleTopMenuClick("stat10")}>Statistic 10</li>
          </ul>
        </nav>
        <div className="content">
          {activeSideMenu === "inventory" && <div>Inventory Management Content</div>}
          {activeSideMenu === "orders" && <div>Order Processing Content</div>}
          {activeSideMenu === "products" && <div>Product Catalog Content</div>}
          {activeSideMenu === "suppliers" && <div>Supplier Management Content</div>}
          {activeSideMenu === "reports" && <div>Reports and Analytics Content</div>}
          <Routes>
            <Route path="users" element={<EmpList users={users} providers={providers} />} />
          </Routes>
          {activeSideMenu === "settings" && <div>Settings Content</div>}
          {activeSideMenu === "notifications" && <div>Notifications Content</div>}
          {activeSideMenu === "feedback" && <div>Feedback Content</div>}
          {activeSideMenu === "support" && <div>Support Content</div>}
          {activeTopMenu === "stat1" && <div>Statistic 1 Content</div>}
          {activeTopMenu === "stat2" && <div>Statistic 2 Content</div>}
          {activeTopMenu === "stat3" && <div>Statistic 3 Content</div>}
          {activeTopMenu === "stat4" && <div>Statistic 4 Content</div>}
          {activeTopMenu === "stat5" && <div>Statistic 5 Content</div>}
          {activeTopMenu === "stat6" && <div>Statistic 6 Content</div>}
          {activeTopMenu === "stat7" && <div>Statistic 7 Content</div>}
          {activeTopMenu === "stat8" && <div>Statistic 8 Content</div>}
          {activeTopMenu === "stat9" && <div>Statistic 9 Content</div>}
          {activeTopMenu === "stat10" && <div>Statistic 10 Content</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminPg;