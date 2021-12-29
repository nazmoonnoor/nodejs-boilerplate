import axios from "axios";
import * as dotenv from "dotenv";
import Domain, { DomainInput } from "../models/domain";
import DomainResult, { DomainResultInput } from "../models/domainResult";

dotenv.config();

class DomainService {
    async createBatch(domains: string[]): Promise<any> {
        // Post to scamadviser batch api
        return axios.post(`${process.env.API_BASEURI}/v2/trust/batch/create`, {
            apikey: process.env.API_KEY,
            domains,
        });
    }

    async getDomainResult(batch_id: number): Promise<any> {
        // Get scamadviser download api
        return axios.get(
            `${process.env.API_BASEURI}/v2/trust/batch/download/?apikey=${process.env.API_Key}&batch=${batch_id}`
        );
    }

    async saveDomain(input: DomainInput): Promise<any> {
        try {
            // Save domains to db
            await Domain.create(input);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async saveDomainResult(inputs: DomainResultInput[]): Promise<any> {
        try {
            // Save domain results to db
            for (let i = 0; i < inputs.length; i++) {
                // eslint-disable-next-line no-await-in-loop
                await DomainResult.create(inputs[i]);
            }
        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default new DomainService();
