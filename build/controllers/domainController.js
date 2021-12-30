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
const axios_1 = __importDefault(require("axios"));
const domainServices_1 = __importDefault(require("../services/domainServices"));
const logger_1 = __importDefault(require("../utils/logger"));
const retry_1 = require("../utils/retry");
class DomainController {
    constructor() {
        // Creates a batch request to scam adviser api
        this.createBatch = (domains) => __awaiter(this, void 0, void 0, function* () {
            const response = yield domainServices_1.default.createBatch(domains);
            console.log(response);
            const { data } = response;
            const domainInput = {
                id: null,
                batch_id: data.batch,
                name: data.name,
                domains: data.domains,
                created_at: new Date(Date.now()).toISOString(),
                request_status: data.error !== false,
            };
            // Saves domain information to db
            yield domainServices_1.default.saveDomain(domainInput);
            return data.batch;
        });
        this.createDomainHandler = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.createBatch(req.body && req.body.domains);
            const batchId = response;
            res.sendStatus(201);
            // Scam adviser process a batch operation, which takes time to respond from their server
            // This operation wait for it to finish and then save data to db
            const performBatchOperation = () => __awaiter(this, void 0, void 0, function* () {
                // Process a retry operation
                // Until it can fetch/download the details of batch data from scam adviser api
                const p = () => {
                    return domainServices_1.default.getDomainResult(batchId);
                };
                const batch = yield (0, retry_1.retryFetching)(p, 10, 500);
                const inputs = [];
                const keys = Object.keys(batch);
                const values = Object.values(batch);
                for (let i = 0; i < keys.length; i++) {
                    const domainName = keys[i];
                    inputs.push({
                        id: null,
                        batch_id: batchId,
                        name: domainName,
                        domain: domainName,
                        created_at: new Date(Date.now()).toISOString(),
                        status: values[i].status,
                        site_response: values[i].site_response,
                        score: values[i].score,
                        blacklisted: values[i].blacklisted,
                        valid_ssl: values[i].valid_ssl,
                    });
                }
                yield domainServices_1.default.saveDomainResult(inputs);
                logger_1.default.info("Save domain data to db successfully");
            });
            setTimeout(() => {
                performBatchOperation();
            }, 0);
        });
        this.getDomainByUrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get started");
                axios_1.default
                    .get("http://api.scamadviser.cloud/v2/trust/batch/status/?apikey=KYL5KOd9EN0Hl3sQKd4oIs7OfkB6qnNz&batch=6859")
                    .then((data) => {
                    console.log(data);
                    return res.json(data);
                })
                    .catch((err) => {
                    console.log(err);
                    return res.send(err);
                });
                // const domain = await DomainService.getDomainResultByUrl(req.params.url);
                // res.send(domain);
            }
            catch (err) {
                throw new Error(err);
            }
        });
        this.getDomainByDates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const domain = yield domainServices_1.default.getDomainResultByDates({
                    startDate: req.query.startdate,
                    endDate: req.query.enddate,
                });
                res.send(domain);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = new DomainController();
