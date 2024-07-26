import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../errors/custom-error";
import { RequestValidationError } from "../errors/request-validatior-error";

export const validateRequest = (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    next();
};