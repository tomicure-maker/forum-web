import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService.js"
import { getUsers, updateUserRole } from "../../services/userService.js";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    const currentUser = getCurrentUser();

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    async function handleRoleChange(userId, newRole) {
        setError("");
        setMessage("");

        try {
            const result = await updateUserRole(userId, newRole);

            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user.id === userId
                        ? { ...user, rol: result.user.rol }
                        : user
                )
            );

            setMessage("Rol actualizado correctamente");
        } catch (error) {
            setError(error.message);
        }
    }

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <main className="container mt-4">
            <h2>Administracion de usuarios</h2>

            {error && <p className="text-danger">{error}</p>}
            {message && <p className="text-success">{message}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombreUsuario}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>
                                {user.rol === "superadmin" ||
                                user.id === currentUser?.id ? (
                                    <span>Sin acciones disponibles</span>
                                ) : (
                                    <select
                                        value={user.rol}
                                        onChange={(e) =>
                                            handleRoleChange(
                                                user.id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="usuario">
                                            Usuario
                                        </option>
                                        <option value="admin">
                                            Administrador
                                        </option>
                                    </select>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default AdminPanel;