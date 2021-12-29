import * as dotenv from "dotenv";
import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import appRoutes from "./routes/appRoutes";
import domainRoutes from "./routes/domainRoutes";
import logger from "./utils/logger";

dotenv.config();

const app = express();

const port = process.env.PORT || 1337;

// Middleware: body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route handlers
app.use("/api", appRoutes);
app.use("/api/domain", domainRoutes);

// 404 error handling
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`App is running on port: ${port}`);
});
