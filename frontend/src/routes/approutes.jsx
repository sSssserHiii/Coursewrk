import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProviderPg from "../components/usrPages/ProviderPage/ProviderPg";
import EmployeePg from "../components/usrPages/EmployeePage/EmployeePg";
import AdminPg from "../components/usrPages/AdminPage/AdminPg";
import LoginPage from "../components/Auth/LoginPage";
import EmployeeTable from "../components/usrPages/AdminPage/AddEmpl/EmployeeTable"; 
import AddEmployee from "../components/usrPages/AdminPage/AddEmpl/AddEmployee"; 
import AddProvider from "../components/usrPages/AdminPage/AddEmpl/AddProvider";
import EditEmployee from "../components/usrPages/AdminPage/AddEmpl/EditEmployee";
import EditProvider from "../components/usrPages/AdminPage/AddEmpl/EditProvider"; // Добавьте импорт


const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/provider/*" element={<ProviderPg />} />
    <Route path="/employee/*" element={<EmployeePg />} />
    <Route path="/admin/*" element={<AdminPg />} />
    <Route path="/admin/employees" element={<EmployeeTable />} />
    <Route path="/add-employee" element={<AddEmployee />} />
    <Route path="/add-provider" element={<AddProvider />} />
    <Route path="/edit-employee/:id" element={<EditEmployee />} /> {/* Добавляем маршрут для редактирования */}
    <Route path="/edit-provider/:id" element={<EditProvider />} /> {/* Добавьте этот маршрут */}

  </Routes>
);

export default AppRoutes;
