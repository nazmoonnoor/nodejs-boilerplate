import { Request, Response } from "express";
import { DomainInput } from "../models/domain";
import { DomainResultInput } from "../models/domainResult";
import DomainService from "../services/domainServices";
import logger from "../utils/logger";
import { retryFetching } from "../utils/retry";

class DomainController {
    // Creates a batch request to scam adviser api
    createBatch = async (domains: any): Promise<any> => {
        const response = await DomainService.createBatch(domains);
        // console.log(response);
        const { data } = response;
        const domainInput: DomainInput = {
            id: null,
            batch_id: data.batch,
            name: data.name,
            domains: data.domains,
            created_at: new Date(Date.now()).toISOString(),
            request_status: data.error !== false,
        };

        // Saves domain information to db
        await DomainService.saveDomain(domainInput);

        return data.batch;
    };

    createDomainHandler = async (req: Request, res: Response) => {
        const response = await this.createBatch(req.body && req.body.domains);

        const batchId = response;
        res.sendStatus(201);

        // Scam adviser process a batch operation, which takes time to respond from their server
        // This operation wait for it to finish and then save data to db
        const performBatchOperation = async () => {
            // Process a retry operation
            // Until it can fetch/download the details of batch data from scam adviser api
            const p = () => {
                return DomainService.getDomainResult(batchId);
            };

            const batch = await retryFetching(p, 10, 500);

            const inputs: DomainResultInput[] = [];
            const keys = Object.keys(batch);
            const values: any = Object.values(batch);

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

            await DomainService.saveDomainResult(inputs);
            logger.info("Save domain data to db successfully");
        };

        setTimeout(() => {
            performBatchOperation();
        }, 0);
    };

    getDomainByUrl = async (req: Request, res: Response) => {
        try {
            const domain = await DomainService.getDomainResultByUrl(req.params.url);
            res.send(domain);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    getDomainByDates = async (req: Request, res: Response) => {
        try {
            const domain = await DomainService.getDomainResultByDates({
                startDate: req.query.startdate,
                endDate: req.query.enddate,
            });

            res.send(domain);
        } catch (err: any) {
            throw new Error(err);
        }
    };
}

export default new DomainController();
