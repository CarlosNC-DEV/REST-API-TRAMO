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

const router = Router();

// CREAR UNA SOLICITUD

router.post("/solicitudCon", createSoli);

// SOLICITUDES PENDIENTES

router.get("/solicitudesPendiente", soliPendiente);

router.get("/solicitudesPendiente/:id", soliPendienteUnica);

router.put("/rechazarSolicitud/:id", rechazarSoli);

router.put("/aceptarSoli/:id", aceptarSoliConductor);

// SOLICITUDES RECHAZADAS

router.get("/solicitudesRechazadas", soliRechazada);

router.get("/solicitudesRechazadas/:id", soliRechazadaUnica);

export default router;
