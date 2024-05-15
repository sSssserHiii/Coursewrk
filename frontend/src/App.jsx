import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/approutes'
import React from 'react';


function App() {
  return (
<BrowserRouter>
<AppRoutes/>
</BrowserRouter>

  )
}

export default App
