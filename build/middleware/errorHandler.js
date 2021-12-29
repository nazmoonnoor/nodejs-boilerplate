"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.use = void 0;
/*
 * Caller function for global error handling
 * route all calls through this to try and handle errors
 */
const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.use = use;
const notFoundHandler = () => (req, res, next) => {
    res.status(404).send("Requested url was not found!");
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = () => (err, req, res, next) => {
    if (res.headersSent) {
        next("There was a problem!");
    }
    else {
        if (err.message)
            return res.status(500).send(err.message);
        res.status(500).send("There was an error!");
    }
};
exports.errorHandler = errorHandler;
