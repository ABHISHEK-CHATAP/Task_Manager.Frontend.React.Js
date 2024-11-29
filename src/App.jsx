import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css'

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route
            path="/dashboard"
            element={auth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App
