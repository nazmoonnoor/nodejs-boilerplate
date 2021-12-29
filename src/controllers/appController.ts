import { Request, Response } from "express";
import db from "../db";

class AppController {
    healthcheck = (req: Request, res: Response) => res.sendStatus(200);

    runMigrations = () => (req: Request, res: Response) => {
        db.runMigrations()
            .then(() => res.status(200).send(`db-migration completed!`))
            .catch(() => res.status(500).send("db-migration: failed"));
    };
}

export default new AppController();
