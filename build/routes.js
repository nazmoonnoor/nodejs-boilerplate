"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    app.get("/run-migrations", (req, res) => {
        db_1.default.runMigrations()
            .then(() => res.status(200).send(`db-migration completed!`))
            .catch(() => res.status(500).send("db-migration: failed"));
    });
}
exports.default = routes;
