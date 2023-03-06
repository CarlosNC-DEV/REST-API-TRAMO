import { Router } from "express";
import multer from 'multer';
import { storageConductor } from '../libs/cloudinary.js';
import {
  PurbeCreate,
  createSoli,
  soliPendiente,
  soliPendienteUnica,
  rechazarSoli,
  aceptarSoliConductor,
  soliRechazada,
  soliRechazadaUnica,
} from "../controllers/solicitudes.controllers.js";
const upload = multer({
  storage: storageConductor
});

import { verifyToken } from '../middleware/loginAdmin.js';

const router = Router();

// CREAR UNA SOLICITUD
const input = upload.fields([{name: 'perfilImgCon'}, {name: 'frente'}, {name: 'volco'}, {name: 'izquierdo'}, {name: 'derecho'}, {name: 'izquierdotrailer'}, {name: 'derechotrailer'}, {name: 'volcotrailer'}]);
router.post("/solicitudCon", input, createSoli);

router.post("/solicitudConSAVE", input, PurbeCreate);

// SOLICITUDES PENDIENTES

router.get("/solicitudesPendiente", verifyToken, soliPendiente);

router.get("/solicitudesPendiente/:id", verifyToken, soliPendienteUnica);

router.put("/rechazarSolicitud/:id", verifyToken, rechazarSoli);

router.put("/aceptarSoli/:id", verifyToken, aceptarSoliConductor);

// SOLICITUDES RECHAZADAS

router.get("/solicitudesRechazadas", verifyToken, soliRechazada);

router.get("/solicitudesRechazadas/:id", verifyToken, soliRechazadaUnica);

export default router;
