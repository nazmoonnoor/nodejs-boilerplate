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
const db_1 = __importDefault(require("../db"));
const Domain = {
    create(input) { },
    findByUrl(url) { },
};
// Create domain
Domain.create = (input) => __awaiter(void 0, void 0, void 0, function* () {
    db_1.default.initPool();
    yield db_1.default.pool.connect();
    yield db_1.default.pool
        .query(`INSERT into domains(batch_id, name, domains, created_at, request_status) VALUES($1, $2, $3, $4, $5)`, [input.batch_id, input.name, input.domains, input.created_at, input.request_status])
        .then((results) => {
        return results.rows;
    })
        .catch((err) => {
        throw new Error(err);
    })
        .finally(() => {
        if (db_1.default && db_1.default.pool)
            db_1.default.pool.end();
    });
});
Domain.findByUrl = (url) => __awaiter(void 0, void 0, void 0, function* () {
    db_1.default.initPool();
    yield db_1.default.pool.connect();
    try {
        const { rows } = yield db_1.default.pool.query("SELECT * FROM domains WHERE domain = $1::text", [
            url,
        ]);
        return rows;
    }
    catch (err) {
        throw new Error(err);
    }
    finally {
        if (db_1.default && db_1.default.pool)
            db_1.default.pool.end();
    }
});
exports.default = Domain;
