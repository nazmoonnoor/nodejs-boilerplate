import express from "express";
import * as dotenv from "dotenv";
import log from "./utils/logger";
import routes from "./routes";

dotenv.config();

const app = express();

const port = process.env.PORT || 1337;

app.listen(port, () => {
    log.info(`App is running on port: ${port}`);
    routes(app);
});
