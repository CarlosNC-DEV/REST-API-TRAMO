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

import { verifyToken } from '../middleware/loginAdmin.js';

const router = Router();

// Crear un cliente empresa

router.post("/crearClienteEmpresa", verifyToken, crearClientePJU);

// ver clientes empresa habilitados

router.get("/datosClientesEmpresaHB", verifyToken, datosClientesEmpresaHB);

// Ver unico cliente empresa habilitado

router.get("/datosClientesEmpresaHB/:id", verifyToken, datosClientesEmpresaUnicoHB);

// Inhabilitar cliente tipo empresa

router.put("/datosClientesEmpresaHB/:id", verifyToken, inhabilitarClientePJU);

// ===============================================================

// ver clientes empresa inhabilitado

router.get("/datosClientesEmpresaIN", verifyToken, datosClientesEmpresaIN);

// Ver unico cliente empresa habilitado

router.get("/datosClientesEmpresaIN/:id", verifyToken, datosClientesEmpresaUnicoIN);

// Inhabilitar cliente tipo empresa

router.put("/datosClientesEmpresaIN/:id", verifyToken, habilitarClientePJU);

export default router;
