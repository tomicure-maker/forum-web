import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import './Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();

  
  const user = {
    username: 'Usuario',
    role: 'user' 
  };

  const handleLogout = () => {
    
    console.log('Cerrando sesión...');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-logo">
        <Link to="/">
          <span>ForumWeb</span>
        </Link>
      </div>

      
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Inicio
          </NavLink>
        </li>
        
        {user && (
          <li>
            <NavLink to="/mis-posts" className={({ isActive }) => (isActive ? 'active' : '')}>
              Mis Publicaciones
            </NavLink>
          </li>
        )}

     
        {user && (user.role === 'admin' || user.role === 'super-admin') && (
          <li>
            <NavLink to="/admin/gestion" className={({ isActive }) => (isActive ? 'active' : '')}>
              Panel Admin
            </NavLink>
          </li>
        )}

     
        {user && user.role === 'super-admin' && (
          <li>
            <NavLink to="/admin/usuarios" className={({ isActive }) => (isActive ? 'active' : '')}>
              Gestión Usuarios
            </NavLink>
          </li>
        )}
      </ul>

     
      <div className="navbar-auth">
        {user ? (
          <div className="user-profile">
            <span className="user-name">Hola, {user.username}</span>
            <span className={`badge-role role-${user.role}`}>{user.role}</span>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="btn-register">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};