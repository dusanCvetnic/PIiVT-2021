import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

export function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req)
    const matched = matchedData(req, {
        includeOptionals: true,
    })

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    if(Object.keys(req.body).length > Object.keys(matched).length){
        return res.status(400).json({ errors: "Pogresan broj ili nemoguca polja" })
    }

    next()
}