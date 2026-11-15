import { Router } from "express";
import { requireAuth, requireSuperAdmin } from "../middleware/authMiddleware.js";
import { updateUserRole, getUsers, deleteUser} from "../services/userService.js";  

const router = Router();
router.get(
    "/users",
    requireAuth,
    requireSuperAdmin,
    async(req, res, next) => {
        try {
            const users = await getUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    "/users/:id/role",
    requireAuth,
    requireSuperAdmin,
    async (req, res, next) => {
    
        try {
            const updateUser = await updateUserRole(
                Number(req.params.id),
                req.body.rol,
                req.user.id
            );

            res.json({
                message: "Rol actualizado correctamente",
                user: {
                    id: updateUser.id,
                    nombreUsuario: updateUser.nombreUsuario,
                    email: updateUser.email,
                    rol: updateUser.rol,
            
                },
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    "/users/:id",
    requireAuth,
    requireSuperAdmin,
    async (req, res, next) => {
        try {
            const userId = Number(req.params.id);

            if (!Number.isInteger(userId) || userId <= 0) {
                return res.status(400).json({
                    message: "ID de usuario inválido"
                });
            }

            await deleteUser(userId, req.user.id);

            res.json({
                message: "Usuario eliminado correctamente"
            });

        } catch (error) {
            next(error);
        }
    }
);




export default router;