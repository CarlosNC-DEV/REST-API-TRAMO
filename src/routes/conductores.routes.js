import { Router } from "express";
import { conductoresDis, conductoresEnServicio } from "../controllers/conductores.controllers.js";

const router = Router();

router.get("/conductoresDis", conductoresDis);
router.get("/conductoresEnServicio", conductoresEnServicio);

export default router;
