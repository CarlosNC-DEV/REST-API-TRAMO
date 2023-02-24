import { Router } from "express";
import {
  createSoli,
  soliPendiente,
  soliPendienteUnica,
  rechazarSoli,
  aceptarSoliConductor,
  soliRechazada,
  soliRechazadaUnica,
} from "../controllers/solicitudes.controllers.js";

import { verifyToken } from '../middleware/loginAdmin.js';

const router = Router();

// CREAR UNA SOLICITUD

router.post("/solicitudCon", verifyToken, createSoli);

// SOLICITUDES PENDIENTES

router.get("/solicitudesPendiente", verifyToken, soliPendiente);

router.get("/solicitudesPendiente/:id", verifyToken, soliPendienteUnica);

router.put("/rechazarSolicitud/:id", verifyToken, rechazarSoli);

router.put("/aceptarSoli/:id", verifyToken, aceptarSoliConductor);

// SOLICITUDES RECHAZADAS

router.get("/solicitudesRechazadas", verifyToken, soliRechazada);

router.get("/solicitudesRechazadas/:id", verifyToken, soliRechazadaUnica);

export default router;
