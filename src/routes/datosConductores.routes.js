import { Router } from 'express';
import { conductorHabilitado, conductorHabilitadoUnico, conductorInhabilitado, inhabilitarConductor, conductorInhabilitadoUnico,  habilitarConductor } from '../controllers/datosConductores.controllers.js'

const router = Router();

// CONDUCTORES HABILITADOS
router.get('/datosConductoresHabilitados', conductorHabilitado);

// UNICO CONDUCTOR HABILITADO

router.get('/datosConductoresHabilitados/:id', conductorHabilitadoUnico);

// INHABILITAR CONDUCTOR
router.put('/datosInhabilitarConductor/:id', inhabilitarConductor);

// ======================================================================

// CONDUCTORES INHABILITADOS
router.get('/datosConductoresInhabilitados', conductorInhabilitado);

// UNICO CONDUCTOR INHABILITADOS

router.get('/datosConductoresInhabilitados/:id', conductorInhabilitadoUnico);

// HABALITAR CONDUCTOR
router.put('/datosHabilitarConductor/:id', habilitarConductor);

export default router;