import { useEffect, useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated, logout } from "../../services/authService.js";
import {ThemeContext} from '../../services/theme/theme.context.jsx';
import {LIGHT_TH} from '../../services/theme/theme.constants.js';
import { Button } from "react-bootstrap";

import "./Navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(getCurrentUser());
    useEffect(() => {
        const updateUser = () => setUser(getCurrentUser());
        window.addEventListener("forum-auth-changed", updateUser);
        return () => window.removeEventListener("forum-auth-changed", updateUser);
    }, []);

    const handleLogout = () => { logout(); navigate("/"); };

    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
    <>
    <nav className="navbar">
        <div className="navbar-logo"><Link to="/"><span>ForumWeb</span></Link></div>
        <ul className="navbar-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Inicio</NavLink></li>
            {user?.esAdmin && <li><span className="badge-role role-admin">Administrador</span></li>}
        </ul>
        <div className="navbar-auth">
            {user && isAuthenticated() ? <div className="user-profile">
                <span className="user-name">Hola, {user.nombreUsuario}</span>
                <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
            </div> : <div className="auth-buttons">
                <Link to="/login" className="btn-login">Iniciar sesión</Link>
                <Link to="/register" className="btn-register">Registrarse</Link>
            </div>}
        </div>
        <div className="theme-toggle">
            <Button className="btn-theme" onClick={toggleTheme}>
                {theme === LIGHT_TH ? (
                    <img className="bi bi-sun-fill" src="/sun-fill.svg" width="16" height="16" focusable="true" alt="" />
                ) : (
                    <img className="bi bi-sun" src="/sun.svg" width="16" height="16" focusable="true" alt="" />
                )}
            </Button>
        </div>
    </nav>
    </>
    )
};
