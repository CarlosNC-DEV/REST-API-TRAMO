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

import { verifyToken } from '../middleware/loginAdmin.js';

const router = Router();

// Crear un cliente natural

router.post("/crearClienteNatural", verifyToken, crearClienteNT)

// ver clientes naturales habilitados
 
router.get("/datosClientesNaturalHB", verifyToken, datosClientesNaturalHB);


// ver unico cliente natural habilitados
 
router.get("/datosClientesNaturalHB/:id", verifyToken, datosClientesNaturalUnicoHB);


// Inhabilitar cliente natural

router.put("/datosClientesNaturalHB/:id", verifyToken, inhabilitarClientePNA);

// ===============================================================


// ver clientes naturales inhabilitado

router.get("/datosClientesNaturalIN", verifyToken, datosClientesNaturalIN);


// ver unico cliente natural inhabilitado

router.get("/datosClientesNaturalIN/:id", verifyToken, datosClientesNaturaUnicolIN);


// habilitar cliente natural

router.put("/datosClientesNaturalIN/:id", verifyToken, habilitarClientePNA);

export default router;