import { Router } from "express";
import { autenticacionAdmin, controlerAdmin, cerraSesion, createAdmin} from "../controllers/loginAdmin.controllers.js";

const router = Router();

// para crear un nuevo administrador TRAMO.
router.post("/register", createAdmin);

// Validacion admistrador.
router.post("/auth", autenticacionAdmin);

// // cotroladores de sesion.
router.get("/adminPrinci", controlerAdmin);

// Destruye la sesión.
router.get("/logout", cerraSesion);

export default router;
