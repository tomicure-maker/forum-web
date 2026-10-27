import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { login, register } from "../../services/authService.js";

export default function AuthForm({ mode }) {
    const isRegister = mode === "register";
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [identificador, setIdentificador] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (isRegister) await register({ nombreUsuario, email, password });
            else await login({ identificador, password });
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-4" style={{ maxWidth: 480 }}>
            <h1>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                {isRegister ? <>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required autoComplete="username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                    </Form.Group>
                </> : <Form.Group className="mb-3">
                    <Form.Label>Usuario o email</Form.Label>
                    <Form.Control value={identificador} onChange={(e) => setIdentificador(e.target.value)} required autoComplete="username" />
                </Form.Group>}
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={isRegister ? 8 : undefined} autoComplete={isRegister ? "new-password" : "current-password"} />
                    {isRegister && <Form.Text>Debe tener al menos 8 caracteres.</Form.Text>}
                </Form.Group>
                <Button type="submit" disabled={loading}>{loading ? "Procesando..." : isRegister ? "Registrarse" : "Ingresar"}</Button>
            </Form>
            <p className="mt-3">{isRegister ? "¿Ya tenés cuenta? " : "¿Todavía no tenés cuenta? "}
                <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Iniciá sesión" : "Registrate"}</Link>
            </p>
        </div>
    );
}
