// Dependencies
import express from "express";
import DomainController from "../controllers/domainController";
import { use } from "../middleware/errorHandler";

const router = express.Router();

router
    .post("/create", use(DomainController.createDomainHandler))
    .get("/", use(DomainController.getDomainByDates))
    .get("/:url", use(DomainController.getDomainByUrl));

export default router;
