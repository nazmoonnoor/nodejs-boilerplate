import db from "../db";

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
    findByUrl(url: string): any {},
};

// Create domain
Domain.create = async (input: DomainInput): Promise<any> => {
    db.initPool();
    await db.pool.connect();
    await db.pool
        .query(
            `INSERT into domains(batch_id, name, domains, created_at, request_status) VALUES($1, $2, $3, $4, $5)`,
            [input.batch_id, input.name, input.domains, input.created_at, input.request_status]
        )
        .then((results) => {
            return results.rows;
        })
        .catch((err) => {
            throw new Error(err);
        })
        .finally(() => {
            if (db && db.pool) db.pool.end();
        });
};

Domain.findByUrl = async (url: string): Promise<any> => {
    db.initPool();
    await db.pool.connect();
    try {
        const { rows } = await db.pool.query("SELECT * FROM domains WHERE domain = $1::text", [
            url,
        ]);
        return rows;
    } catch (err: any) {
        throw new Error(err);
    } finally {
        if (db && db.pool) db.pool.end();
    }
};

export default Domain;
