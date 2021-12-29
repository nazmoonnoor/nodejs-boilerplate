// Dependencies
import express from "express";
import DomainController from "../controllers/domainController";
import { use } from "../middleware/errorHandler";

const router = express.Router();

router.post("/create", use(DomainController.createDomainHandler));
router.get("/absences", use(memberController.getAbsences));

export default router;
