import { Query } from "pg";
import db from "../db";
import logger from "../utils/logger";

export interface DomainResultInput {
    id: any;

    batch_id: number;

    name: string;

    domain: string;

    status: string;

    site_response: string;

    score: number;

    blacklisted: boolean;

    created_at: string;

    valid_ssl: boolean;
}

const DomainResult = {
    create(input: DomainResultInput): any {},
    findById(id: number): any {},
};

// Create domain
DomainResult.create = async (input: DomainResultInput) => {
    db.initPool();
    await db.pool.connect();
    await db.pool
        .query(
            `INSERT into domain_results(batch_id, name, domain, status, site_response, score, blacklisted, created_at, valid_ssl) VALUES($1, $2, $3, $4, $5,$6, $7, $8, $9)`,
            [
                input.batch_id,
                input.name,
                input.domain,
                input.status,
                input.site_response,
                input.score,
                input.blacklisted,
                input.created_at,
                input.valid_ssl,
            ]
        )
        .then((results) => results.rows)
        .catch((e) => {
            throw new Error(e);
        })
        .finally(() => {
            if (db && db.pool) db.pool.end();
        });
};

DomainResult.findById = (id: number) => {
    const query = new Query("SELECT * FROM domains WHERE id = $1::text", [id]);

    const result = db.client.query(query);

    query.on("row", (row) => {
        logger.info("row!", row); // { name: 'brianc' }
    });
    query.on("end", () => {
        logger.info("query done");
    });
    query.on("error", (err) => {
        logger.info(err.stack);
    });
};

export default DomainResult;
