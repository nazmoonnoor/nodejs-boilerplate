import * as dotenv from "dotenv";
import { Request, Response } from "express";
import db from "../db";
import logger from "../utils/logger";

dotenv.config();

class AppController {
    healthcheck = async (req: Request, res: Response) => res.sendStatus(200);

    runMigrations = async (req: Request, res: Response) => {
        logger.info(`db-migration: started: ${process.env.DB_HOST}`);
        await db
            .runMigrations()
            .then(() => res.status(200).send(`db-migration: completed!`))
            .catch((err: any) => {
                res.status(500).send(`db-migration: failed. ${err}`);
            });
    };
}

export default new AppController();
