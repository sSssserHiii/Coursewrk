import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProviderPg from "../components/ProviderPage/ProviderPg";
import EmployeePg from "../components/EmployeePage/EmployeePg";
import AdminPg from "../components/AdminPage/AdminPg";
import LoginPage from "../components/Auth/LoginPage" ;



const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/provider" element={<ProviderPg />} />
    <Route path="/employee" element={<EmployeePg />} />
    <Route path="/admin/*" element={<AdminPg />} />
  </Routes>
);

export default AppRoutes;