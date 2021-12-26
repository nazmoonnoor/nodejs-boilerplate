import { Express, Request, Response } from "express";
import db from "./db";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.sendStatus(200)
    );
    app.get("/run-migrations", (req: Request, res: Response) => {
        db.runMigrations().then(() =>
            res.status(200).send(`db-migration completed!`)
        );
    });
}

export default routes;
