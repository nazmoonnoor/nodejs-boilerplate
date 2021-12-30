"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const pg_1 = require("pg");
const postgres_migrations_1 = require("postgres-migrations");
const logger_1 = __importDefault(require("../utils/logger"));
dotenv.config();
const poolConfig = {
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    max: Number(process.env.DB_POOL_SIZE),
    idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
    connectionTimeoutMillis: Number(process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT),
};
class Database {
    constructor() {
        this.linuxPath = `${__dirname}/migrations/sql`;
        this.windowsPath = path_1.default.resolve(__dirname, "migrations\\sql");
        this.initPool = () => {
            if (this.pool) {
                this.pool = new pg_1.Pool(poolConfig);
            }
        };
        this.runMigrations = () => __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield (0, postgres_migrations_1.migrate)({ client }, this.linuxPath);
            }
            catch (err) {
                logger_1.default.info(`migation fails. ${err}`);
            }
            finally {
                client.release();
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                this.pool && this.pool.end();
            }
        });
        logger_1.default.info(`Host: ${poolConfig.host}`);
        this.pool = new pg_1.Pool(poolConfig);
        this.client = new pg_1.Client(poolConfig);
    }
}
const db = new Database();
exports.default = db;
