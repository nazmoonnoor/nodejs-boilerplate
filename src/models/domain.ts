import { Query } from "pg";
import db from "../db";
import logger from "../utils/logger";

export interface DomainInput {
    id: any;

    batch_id: number;

    name: string;

    domains: [];

    created_at: string;

    request_status: boolean;
}

const Domain = {
    create(input: DomainInput): any {},
    findById(id: number): any {},
};

// Create domain
Domain.create = async (input: DomainInput) => {
    db.initPool();
    await db.pool.connect();
    await db.pool
        .query(
            `INSERT into domains(batch_id, name, domains, created_at, request_status) VALUES($1, $2, $3, $4, $5)`,
            [input.batch_id, input.name, input.domains, input.created_at, input.request_status]
        )
        .then((results) => results.rows)
        .catch((e) => {
            throw new Error(e);
        })
        .finally(() => {
            if (db && db.pool) db.pool.end();
        });
};

Domain.findById = (id: number) => {
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

export default Domain;
