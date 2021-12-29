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
Object.defineProperty(exports, "__esModule", { value: true });
const domainServices_1 = require("../services/domainServices");
const retry_1 = require("../utils/retry");
class DomainController {
    constructor() {
        // Error is handled by errorHandler middleware
        this.createBatch = (domains) => __awaiter(this, void 0, void 0, function* () {
            const batch = yield (0, domainServices_1.createBatch)(domains);
            batch
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                const { data } = response;
                const domainInput = {
                    id: null,
                    batch_id: data.batch_id,
                    name: data.name,
                    domains: data.domains,
                    created_at: Date.now.toString(),
                    request_status: data.status,
                };
                yield (0, domainServices_1.saveDomain)(domainInput);
                const retryCondition = (status) => {
                    if (status === "DONE")
                        return true;
                    return false;
                };
                const p = (0, domainServices_1.getDomainResult)(data.batch_id);
                const promise = yield (0, retry_1.retryPromise)(p, retryCondition, 5, 500);
                return promise;
            }))
                .catch((e) => {
                throw new Error(e);
            });
        });
        this.createDomainHandler = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const promise = yield (0, domainServices_1.createBatch)(req.body && req.body.domains);
            promise
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                const { data } = response;
                const domainInput = {
                    id: null,
                    batch_id: data.batch_id,
                    name: data.name,
                    domains: data.domains,
                    created_at: Date.now.toString(),
                    request_status: data.status,
                };
                // saveDomainResult(domainInput);
                return res.send(201).send("Created");
            }))
                .catch((e) => {
                throw new Error(e);
            });
            // const batch = await createBatch(req.body);
            // batch
            //     .then(async (response: any) => {
            //         const { data } = response;
            //         const domainInput: DomainInput = {
            //             id: null,
            //             batch_id: data.batch_id,
            //             name: data.name,
            //             domains: data.domains,
            //             created_at: Date.now.toString(),
            //             request_status: data.status,
            //         };
            //         await saveDomain(domainInput);
            //         const retryCondition = (status: any) => {
            //             if (status === "DONE") return true;
            //             if (status === "PROCESSING") return false;
            //         };
            //         const p = getDomainResult(data.batch_id);
            //         const promise = await retryPromise(p, retryCondition, 5, 500);
            //         promise.then((response) => {
            //             await saveDomainResult(domainInput);
            //         });
            //         return res.send(201).send("Created");
            //     })
            //     .catch((e: any) => {
            //         throw new Error(e);
            //     });
        });
    }
}
exports.default = new DomainController();
