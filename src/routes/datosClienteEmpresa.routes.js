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

const router = Router();

// Crear un cliente empresa

router.post("/crearClienteEmpresa", crearClientePJU);

// ver clientes empresa habilitados

router.get("/datosClientesEmpresaHB", datosClientesEmpresaHB);

// Ver unico cliente empresa habilitado

router.get("/datosClientesEmpresaHB/:id", datosClientesEmpresaUnicoHB);

// Inhabilitar cliente tipo empresa

router.put("/datosClientesEmpresaHB/:id", inhabilitarClientePJU);

// ===============================================================

// ver clientes empresa inhabilitado

router.get("/datosClientesEmpresaIN", datosClientesEmpresaIN);

// Ver unico cliente empresa habilitado

router.get("/datosClientesEmpresaIN/:id", datosClientesEmpresaUnicoIN);

// Inhabilitar cliente tipo empresa

router.put("/datosClientesEmpresaIN/:id", habilitarClientePJU);

export default router;
