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
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const request_promise_1 = __importDefault(require("request-promise"));
const domain_1 = __importDefault(require("../models/domain"));
const domainResult_1 = __importDefault(require("../models/domainResult"));
dotenv.config();
class DomainService {
    createBatch(domains) {
        return __awaiter(this, void 0, void 0, function* () {
            // Post to scamadviser batch api
            // return axios.post(`${process.env.API_BASEURI}/v2/trust/batch/create`, {
            //     apikey: process.env.API_KEY,
            //     domains,
            // });
            const options = {
                method: "POST",
                uri: `${process.env.API_BASEURI}/v2/trust/batch/create`,
                body: {
                    apikey: process.env.API_KEY,
                    domains,
                },
                json: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bwejjr33333333333",
                },
            };
            // return request(options);
            (0, request_promise_1.default)(options)
                .then(function (response) {
                console.log(response);
                return response;
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    }
    getDomainResult(batch_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get scamadviser download api
            return axios_1.default.get(`${process.env.API_BASEURI}/v2/trust/batch/download/?apikey=${process.env.API_Key}&batch=${batch_id}`);
        });
    }
    saveDomain(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Save domains to db
                yield domain_1.default.create(input);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // Save domain results to db
    saveDomainResult(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < inputs.length; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    yield domainResult_1.default.create(inputs[i]);
                }
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getDomainResultByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // external API request
                const result = yield domainResult_1.default.findByUrl(url);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getDomainResultByDates(dates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = dates;
                const result = yield domainResult_1.default.findByDates(startDate, endDate);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = new DomainService();
