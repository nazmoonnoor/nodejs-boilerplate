import db from "../db";

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
    findByUrl(url: string): any {},
    findByDates(startDate: string, endDate: string): any {},
};

// Create domain
DomainResult.create = async (input: DomainResultInput): Promise<any> => {
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
        .then((results) => {
            return results.rows;
        })
        .catch((err) => {
            throw new Error(`Database might not be connected. ${err}`);
        })
        .finally(() => {
            if (db && db.pool) db.pool.end();
        });
};

DomainResult.findByUrl = async (url: string): Promise<any> => {
    db.initPool();
    await db.pool.connect();
    try {
        const { rows } = await db.pool.query(
            "SELECT * FROM domain_results WHERE domain = $1::text",
            [url]
        );
        return rows;
    } catch (err: any) {
        throw new Error(`Database might not be connected. ${err}`);
    } finally {
        if (db && db.pool) db.pool.end();
    }
};

DomainResult.findByDates = async (startDate: string, endDate: string): Promise<any> => {
    db.initPool();
    await db.pool.connect();
    try {
        const { rows } = await db.pool.query(
            "SELECT * FROM domain_results WHERE created_at >= $1::timestamp AND created_at <= $2::timestamp",
            [startDate, endDate]
        );
        return rows;
    } catch (err: any) {
        throw new Error(`Database might not be connected. ${err}`);
    } finally {
        if (db && db.pool) db.pool.end();
    }
};

export default DomainResult;
