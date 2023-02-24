import { Router } from 'express';
import {
    crearClienteNT,
    datosClientesNaturalHB,
    datosClientesNaturalUnicoHB,
    inhabilitarClientePNA,
    datosClientesNaturalIN,
    datosClientesNaturaUnicolIN,
    habilitarClientePNA,
} from "../controllers/datosClientesNatural.controllers.js";

import { authMiddleware } from '../middleware/loginAdmin.js';

const router = Router();

// Crear un cliente natural

router.post("/crearClienteNatural", crearClienteNT)

// ver clientes naturales habilitados
 
router.get("/datosClientesNaturalHB", authMiddleware, datosClientesNaturalHB);


// ver unico cliente natural habilitados
 
router.get("/datosClientesNaturalHB/:id", authMiddleware, datosClientesNaturalUnicoHB);


// Inhabilitar cliente natural

router.put("/datosClientesNaturalHB/:id", authMiddleware, inhabilitarClientePNA);

// ===============================================================


// ver clientes naturales inhabilitado

router.get("/datosClientesNaturalIN", authMiddleware, datosClientesNaturalIN);


// ver unico cliente natural inhabilitado

router.get("/datosClientesNaturalIN/:id", authMiddleware, datosClientesNaturaUnicolIN);


// habilitar cliente natural

router.put("/datosClientesNaturalIN/:id", authMiddleware, habilitarClientePNA);

export default router;