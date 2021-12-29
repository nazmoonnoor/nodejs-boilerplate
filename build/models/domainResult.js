"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db_1 = __importDefault(require("../db"));
const logger_1 = __importDefault(require("../utils/logger"));
const Domain = {
    create(input) { },
    findById(id) { },
};
// Create domain
Domain.create = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.pool.connect();
    yield db_1.default.pool
        .query(`INSERT into domains(batch_id, name, domain, status, site_response, score, blacklisted, created_at, valid_ssl) VALUES($1, $2, $3, $4, $5,$6, $7, $8, $9)`, [
        input.batch_id,
        input.name,
        input.domain,
        input.status,
        input.site_response,
        input.score,
        input.blacklisted,
        input.created_at,
        input.valid_ssl,
    ])
        .then((results) => console.table(results.rows))
        .catch((e) => logger_1.default.error(e))
        .finally(() => db_1.default.pool.end());
});
Domain.findById = (id) => {
    const query = new pg_1.Query("SELECT * FROM domains WHERE id = $1::text", [id]);
    const result = db_1.default.client.query(query);
    query.on("row", (row) => {
        logger_1.default.info("row!", row); // { name: 'brianc' }
    });
    query.on("end", () => {
        logger_1.default.info("query done");
    });
    query.on("error", (err) => {
        logger_1.default.info(err.stack);
    });
};
exports.default = Domain;
