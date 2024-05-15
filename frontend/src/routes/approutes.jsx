import React from "react";
import { Routes, Route } from "react-router-dom";


import LoginPage from "../components/Auth/LoginPage" 

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default AppRoutes;