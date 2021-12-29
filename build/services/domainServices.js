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
exports.saveDomainResult = exports.saveDomain = exports.getDomainResult = exports.createBatch = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv.config();
function createBatch(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // Post to scamadviser batch api
        return axios_1.default
            .post(`${process.env.API_BASEURI}/v2/trust/batch/create`, {
            apikey: process.env.API_KEY,
            domains: input.domains,
        })
            .then((response) => {
            return response;
        })
            .catch((error) => {
            throw new Error(error);
        });
    });
}
exports.createBatch = createBatch;
function getDomainResult(batch_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get scamadviser download api
        return axios_1.default
            .get(`${process.env.API_BASEURI}/v2/trust/batch/download/?apikey=${process.env.API_Key}batch=${batch_id}`)
            .then((response) => {
            return response;
        })
            .catch((error) => {
            logger_1.default.error(error);
        });
    });
}
exports.getDomainResult = getDomainResult;
function saveDomain(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Save to db
            // const domain = await Domain.create(input);
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.saveDomain = saveDomain;
function saveDomainResult(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Save to db
            // const domain = await Domain.create(input);
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.saveDomainResult = saveDomainResult;
