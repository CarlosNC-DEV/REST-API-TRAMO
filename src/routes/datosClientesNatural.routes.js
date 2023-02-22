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

const router = Router();

// Crear un cliente natural

router.post("/crearClienteNatural", crearClienteNT)

// ver clientes naturales habilitados
 
router.get("/datosClientesNaturalHB", datosClientesNaturalHB);


// ver unico cliente natural habilitados
 
router.get("/datosClientesNaturalHB/:id", datosClientesNaturalUnicoHB);


// Inhabilitar cliente natural

router.put("/datosClientesNaturalHB/:id", inhabilitarClientePNA);

// ===============================================================


// ver clientes naturales inhabilitado

router.get("/datosClientesNaturalIN", datosClientesNaturalIN);


// ver unico cliente natural inhabilitado

router.get("/datosClientesNaturalIN/:id", datosClientesNaturaUnicolIN);


// habilitar cliente natural

router.put("/datosClientesNaturalIN/:id", habilitarClientePNA);

export default router;