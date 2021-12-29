import axios from "axios";
import * as dotenv from "dotenv";
import Domain, { DomainInput } from "../models/domain";
import DomainResult, { DomainResultInput } from "../models/domainResult";

dotenv.config();

class DomainService {
    async createBatch(domains: string[]): Promise<any> {
        // Post to scamadviser batch api
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

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
        } catch (err: any) {
            throw new Error(err);
        }
    }

    // Save domain results to db
    async saveDomainResult(inputs: DomainResultInput[]): Promise<any> {
        try {
            for (let i = 0; i < inputs.length; i++) {
                // eslint-disable-next-line no-await-in-loop
                await DomainResult.create(inputs[i]);
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getDomainResultByUrl(url: string): Promise<any> {
        try {
            const result = await DomainResult.findByUrl(url);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getDomainResultByDates(dates: any): Promise<any> {
        try {
            const { startDate, endDate } = dates;
            const result = await DomainResult.findByDates(startDate, endDate);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default new DomainService();
