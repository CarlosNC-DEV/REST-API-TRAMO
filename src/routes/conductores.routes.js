import { Router } from "express";
import { conductoresDis, conductoresEnServicio } from "../controllers/conductores.controllers.js";

import { verifyToken } from '../middleware/loginAdmin.js';

const router = Router();

router.get("/conductoresDis", verifyToken, conductoresDis);
router.get("/conductoresEnServicio", verifyToken, conductoresEnServicio);

export default router;
