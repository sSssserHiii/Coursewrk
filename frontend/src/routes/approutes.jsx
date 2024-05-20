import React from "react";
import { Routes, Route } from "react-router-dom";


import LoginPage from "../components/Auth/LoginPage" 

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/provider" element={<ProviderPage />} />
    <Route path="/employee" element={<EmployeePage />} />
    <Route path="/admin" element={<AdminPage />} />
  </Routes>
);

export default AppRoutes;