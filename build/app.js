"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
const domainResultRoutes_1 = __importDefault(require("./routes/domainResultRoutes"));
const domainRoutes_1 = __importDefault(require("./routes/domainRoutes"));
const logger_1 = __importDefault(require("./utils/logger"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 1337;
// Middleware: body-parser
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Route handlers
app.use(appRoutes_1.default);
app.use("/domain", domainRoutes_1.default);
app.use(domainResultRoutes_1.default);
// 404 error handling
app.use(errorHandler_1.notFoundHandler);
// Error handler
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    logger_1.default.info(`App is running on port: ${port}`);
});
