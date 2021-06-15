import { Request, Response } from "express";
import { UserLogin } from "../models/user.login.model";
import userService from "../services/user.service";
import * as bcrypt from 'bcrypt';
import TokenData from '../models/tokenData.model';
import * as jwt from 'jsonwebtoken'
import Config from "../common/dev";

export async function userLogin(req: Request, res: Response){
    const data = req.body as UserLogin
    try {
        const user = await userService.readByEmail(req, res, data.email)

        if(user === null) return res.sendStatus(404)

        if(!bcrypt.compareSync(data.password, user.password)){
            await new Promise(resolve => setTimeout(resolve, 1000))
            return res.status(403).send('Pogresna lozinka!')
        }

        if(user.role === 'student'){
            const authTokenData: TokenData = {
                id: user.userId,
                identity: user.email,
                role: user.role
            }
        
            const refreshTokenData: TokenData = {
                id: user.userId,
                identity: user.email,
                role: user.role
            }
        
            const authToken = jwt.sign(
                authTokenData, 
                Config.auth.student.auth.private, 
                {
                    algorithm: Config.auth.student.algorithm,
                    issuer: Config.auth.student.issuer,
                    expiresIn: Config.auth.student.auth.duration
                }
            )

            const refreshToken = jwt.sign(
                refreshTokenData, 
                Config.auth.student.refresh.private, 
                {
                    algorithm: Config.auth.student.algorithm,
                    issuer: Config.auth.student.issuer,
                    expiresIn: Config.auth.student.refresh.duration
                }
            )

            return res.send({
                authToken: authToken,
                refreshToken: refreshToken
            })
        }else{
            const authTokenData: TokenData = {
                id: user.userId,
                identity: user.email,
                role: user.role
            }
        
            const refreshTokenData: TokenData = {
                id: user.userId,
                identity: user.email,
                role: user.role
            }
        
            const authToken = jwt.sign(
                authTokenData, 
                Config.auth.professor.auth.private, 
                {
                    algorithm: Config.auth.professor.algorithm,
                    issuer: Config.auth.professor.issuer,
                    expiresIn: Config.auth.professor.auth.duration
                }
            )

            const refreshToken = jwt.sign(
                refreshTokenData, 
                Config.auth.professor.refresh.private, 
                {
                    algorithm: Config.auth.professor.algorithm,
                    issuer: Config.auth.professor.issuer,
                    expiresIn: Config.auth.professor.refresh.duration
                }
            )

            return res.send({
                authToken: authToken,
                refreshToken: refreshToken
            })
        }
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
    

}