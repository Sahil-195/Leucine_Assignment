import express from "express";
import { addSoftware, getAllSoftwares } from "../controllers/software.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protectRoute, addSoftware);

router.get("/", protectRoute, getAllSoftwares);

export default router;