import { Router } from "express";
import {
    crearClientePJU,
    datosClientesEmpresaHB,
    datosClientesEmpresaUnicoHB,
    inhabilitarClientePJU,
    datosClientesEmpresaIN,
    datosClientesEmpresaUnicoIN,
    habilitarClientePJU,
} from "../controllers/datosClienteEmpresa.controllers.js";

import { authMiddleware } from '../middleware/loginAdmin.js';

const router = Router();

// Crear un cliente empresa

router.post("/crearClienteEmpresa", crearClientePJU);

// ver clientes empresa habilitados

router.get("/datosClientesEmpresaHB", authMiddleware, datosClientesEmpresaHB);

// Ver unico cliente empresa habilitado

router.get("/datosClientesEmpresaHB/:id", authMiddleware, datosClientesEmpresaUnicoHB);

// Inhabilitar cliente tipo empresa

router.put("/datosClientesEmpresaHB/:id", authMiddleware, inhabilitarClientePJU);

// ===============================================================

// ver clientes empresa inhabilitado

router.get("/datosClientesEmpresaIN", authMiddleware, datosClientesEmpresaIN);

// Ver unico cliente empresa habilitado

router.get("/datosClientesEmpresaIN/:id", authMiddleware, datosClientesEmpresaUnicoIN);

// Inhabilitar cliente tipo empresa

router.put("/datosClientesEmpresaIN/:id", authMiddleware, habilitarClientePJU);

export default router;
