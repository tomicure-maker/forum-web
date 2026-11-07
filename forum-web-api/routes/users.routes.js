import { Router } from "express";
import {
    requireAuth,
    requireSuperAdmin,
} from "../middleware/authMiddleware.js";
import { updateUserRole, getUsers,} from "../services/userService.js";  

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

export default router;