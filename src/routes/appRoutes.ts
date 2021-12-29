import express from "express";
import appController from "../controllers/appController";
import { use } from "../middleware/errorHandler";

const router = express.Router();

router.get("/healthcheck", appController.healthcheck);
router.get("/run-migrations", use(appController.runMigrations));

export default router;
