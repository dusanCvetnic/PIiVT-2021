import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/* export function validateNumberOfFields(num){
    return(
        req: Request,
        res: Response,
        next: NextFunction) => {
        if(Object.keys(req.body) > num){
            return res.sendStatus(400)
        }
    }
    
} */

export function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
    }
    next()
}