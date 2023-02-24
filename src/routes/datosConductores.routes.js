import { Router } from 'express';
import { conductorHabilitado, conductorHabilitadoUnico, conductorInhabilitado, inhabilitarConductor, conductorInhabilitadoUnico,  habilitarConductor } from '../controllers/datosConductores.controllers.js';

import { verifyToken } from '../middleware/loginAdmin.js';

const router = Router();

// CONDUCTORES HABILITADOS
router.get('/datosConductoresHabilitados', verifyToken, conductorHabilitado);

// UNICO CONDUCTOR HABILITADO

router.get('/datosConductoresHabilitados/:id', verifyToken, conductorHabilitadoUnico);

// INHABILITAR CONDUCTOR
router.put('/datosInhabilitarConductor/:id', verifyToken, inhabilitarConductor);

// ======================================================================

// CONDUCTORES INHABILITADOS
router.get('/datosConductoresInhabilitados', verifyToken, conductorInhabilitado);

// UNICO CONDUCTOR INHABILITADOS

router.get('/datosConductoresInhabilitados/:id', verifyToken, conductorInhabilitadoUnico);

// HABALITAR CONDUCTOR
router.put('/datosHabilitarConductor/:id', verifyToken, habilitarConductor);

export default router;