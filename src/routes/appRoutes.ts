import express from "express";
import appController from "../controllers/appController";

const router = express.Router();

router.get("/healthcheck", appController.healthcheck);
router.get("/run-migrations", appController.runMigrations);

export default router;
