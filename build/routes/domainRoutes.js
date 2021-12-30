"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importDefault(require("express"));
const domainController_1 = __importDefault(require("../controllers/domainController"));
const errorHandler_1 = require("../middleware/errorHandler");
const router = express_1.default.Router();
router
    .post("/create", (0, errorHandler_1.use)(domainController_1.default.createDomainHandler))
    .get("/", (0, errorHandler_1.use)(domainController_1.default.getDomainByDates))
    .get("/:url", (0, errorHandler_1.use)(domainController_1.default.getDomainByUrl));
exports.default = router;
