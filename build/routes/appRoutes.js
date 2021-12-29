"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appController_1 = __importDefault(require("../controllers/appController"));
const router = express_1.default.Router();
router.get("/healthcheck", appController_1.default.healthcheck);
router.get("/run-migrations", appController_1.default.runMigrations);
exports.default = router;
