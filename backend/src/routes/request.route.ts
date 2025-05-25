import express from "express";
import { getStatusWiseRequests, softwareAccessRequest, acceptOrRejectHandler, userSoftwareRequestsStatus } from "../controllers/request.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", protectRoute, getStatusWiseRequests);

router.post("/", protectRoute, softwareAccessRequest);

router.patch('/:id', protectRoute, acceptOrRejectHandler);

router.get('/status', protectRoute, userSoftwareRequestsStatus);



export default router;