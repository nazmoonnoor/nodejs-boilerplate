import { Request, Response } from "express";
import { DomainInput } from "../models/domain";
import { DomainResultInput } from "../models/domainResult";
import DomainService from "../services/domainServices";
import { retryFetching } from "../utils/retry";

class DomainController {
    // Creates a batch request to scam adviser api
    createBatch = async (domains: any): Promise<any> => {
        const response = await DomainService.createBatch(domains);
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

        // Process a retry operation
        // Until it can fetch/download the details of batch data from scam adviser api
        const p = () => {
            return DomainService.getDomainResult(data.batch);
        };

        const batch = await retryFetching(p, 10, 500);
        return {
            batchId: data.batch,
            batch,
        };
    };

    createDomainHandler = async (req: Request, res: Response) => {
        const response = await this.createBatch(req.body && req.body.domains);

        const { batchId } = response;
        const inputs: DomainResultInput[] = [];
        const d = response.batch;
        const keys = Object.keys(d);
        const values: any = Object.values(d);

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
        return res.sendStatus(201);
    };
}

export default new DomainController();
