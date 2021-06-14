import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

export function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req)
    const matched = matchedData(req, {
        includeOptionals: true
    })
    //console.log(`${Object.keys(matched).length}, ${Object.keys(req.body).length}`)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    if(Object.keys(req.body).length > Object.keys(matched).length){
        //console.log("usao")
        return res.status(400).json({ errors: "Pogresan broj ili nemoguca polja" })
    }

    next()
}