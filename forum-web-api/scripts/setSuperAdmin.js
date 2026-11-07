import { sequelize, migrateUserRoles } from "../db.js";
import { User} from "../models/User.js";

const email = process.argv[2]?.trim().toLowerCase();

try {
    if (!email) {
        throw new Error("Debes indicar el email del usuario");

    }

    await sequelize.authenticate();

    await migrateUserRoles();

    const existingSuperAdmin = await User.findOne({
        where: { rol: "superadmin" },
    });

    if (existingSuperAdmin) {
        throw new Error ("Ya existe un superAdmin");

    }

    const user = await User.findOne({
        where: {email},
    });

    if (!user) {
        throw new Error("No existe un usuario con ese email");
        
    }

    user.rol = "superadmin";
    user.esAdmin = true;

    await user.save();

    console.log(`${user.nombreUsuario} ahora es superAdmin`);
} catch (error) {
    console.log("No se pudo asignar el rol:", error.message);
    process.exitCode = 1;

} finally {
    await sequelize.close();
}