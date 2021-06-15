import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import Config from '../common/dev';
import TokenData from '../models/tokenData.model';

type UserRole = 'student' | 'professor'

interface TokenValidationInfo{
    isValid: boolean,
    data: any
}

export default class AuthMiddleware{
    private static verifyAuthToken(req: Request, res: Response, next: NextFunction, allowedRoles: UserRole[]){
        
        if(typeof req.headers.authorization !== 'string'){
            return res.status(401).send('Ne postoji token')
        }

        const token: string = req.headers.authorization

        const [ tokenType, tokenString ] = token.trim().split(' ')

        if(tokenType !== 'Bearer'){
            return res.status(400).send('Ne validan tip tokena')
        }

        if(typeof tokenString !== 'string' || tokenString.length === 0){
            return res.status(400).send('Neispravna duzina tokena')
        }
        
        const studentTokenValidation = this.validateTokenAsTokenByRole(tokenString, 'student')
        const professorTokenValidation = this.validateTokenAsTokenByRole(tokenString, 'professor')

        let result

        if(studentTokenValidation.isValid === false && professorTokenValidation.isValid === false){
            return res.status(500).send('Nastao problem u validaciji tokena ' + studentTokenValidation + ' ' + professorTokenValidation)
        }

        if(studentTokenValidation.isValid){
            result = studentTokenValidation.data
        }else{
            result = professorTokenValidation.data
        }

        if(typeof result !== 'object'){
            return res.status(400).send('Neisprvni podaci tokena')
        }

        const data: TokenData = result as TokenData

        if(!allowedRoles.includes(data.role)){
            return res.status(403).send('Nema prava pristupa')
        }
        
        req.authorized = data

        next()
    }

    private static validateTokenAsTokenByRole(tokenString: string, role: UserRole): TokenValidationInfo{
        try {
            const result = jwt.verify(tokenString, Config.auth[role].auth.public)
            return {
                isValid: true,
                data: result
            }
        } catch (error) {
            return {
                isValid: false,
                data: error?.message
            }
        }
    }

    public static getVerifier(...allowedRoles: UserRole[]):(req: Request, res: Response, next: NextFunction) => void{
        return (req: Request, res: Response, next: NextFunction) => {
            this.verifyAuthToken(req, res, next, allowedRoles)
        }
    }
}