import { User } from "../models/User.js";

export async function updateUserRole(userId, newRole, currentUserId) {

    if (!["usuario", "admin"].includes(newRole)) {
        const error = new Error("El rol solicitado no es valido");
        error.status = 400;
        throw error;
    }
    

    const user = await User.findByPk(userId);

    if (!user) {
        const error = new Error("No se encontro el usuario");
        error.status = 404;
        throw error;
    }

    if (user.rol === "superadmin") {
        const error = new Error("No podes modificar el rol de un superadministrador");
        error.status = 403;
        throw error;
}

    if (user.id === currentUserId) {
        const error = new Error("No podes modificar tu propio rol");
        error.status = 403;
        throw error;
    }

    user.rol = newRole;

    user.esAdmin = newRole === "admin";

    await user.save();

    return user;
}

export async function getUsers() {
    return User.findAll({
        attributes: [
            "id",
            "nombreUsuario",
            "email",
            "rol",
        ],
        order: [["id", "ASC"]],
    });
}