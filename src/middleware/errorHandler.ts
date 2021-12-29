import { NextFunction, Request, Response } from "express";
/*
 * Caller function for global error handling
 * route all calls through this to try and handle errors
 */

export const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const notFoundHandler = () => (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Requested url was not found!");
};

export const errorHandler = () => (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        next("There was a problem!");
    } else {
        if (err.message) return res.status(500).send(err.message);
        res.status(500).send("There was an error!");
    }
};
