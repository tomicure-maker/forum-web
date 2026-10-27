import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated, logout } from "../../services/authService.js";
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

    return <nav className="navbar">
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
    </nav>;
};
