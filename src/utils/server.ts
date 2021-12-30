import express from "express";
import appRoutes from "../routes/appRoutes";
import domainRoutes from "../routes/domainRoutes";
// import deserializeUser from "../middleware/deserializeUser";

function createServer() {
    const app = express();

    app.use(express.json());

    // app.use(deserializeUser);

    app.use("/api", appRoutes);
    app.use("/api/domain", domainRoutes);

    return app;
}

export default createServer;
