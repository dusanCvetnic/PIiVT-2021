import { Request, Response, NextFunction } from 'express';
import { connect } from "../common/database";
import { UserModel } from '../models/user.model';
import * as bcrypt from "bcrypt";

export async function getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM user;')

        if(!result[0][0]?.email){
            return res.status(404).send('Ne postoje korisnici')
        }

        return res.json(result[0])
    } catch (error) {
        res.sendStatus(500)
        console.log(error?.sqlMessage)
    }
}

async function getUserByEmail(email): Promise<UserModel> {
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM user WHERE email = ?;', [email])

        return result[0][0] as UserModel
    } catch (error) {
        console.log(error?.sqlMessage)
    }
}

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const id = req.params.id
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM user WHERE user_id = ?;', [id])
        
        if(!result[0][0]?.email){
            return res.status(404).send('Trazeni korisnik ne postoji')
        }

        const user: UserModel = {
            forename: result[0][0]?.forename,
            surname: result[0][0]?.surname,
            email: result[0][0]?.email,
            password: result[0][0]?.password_hash,
            role: result[0][0]?.role,
        }
        
        return res.json(user)
    } catch (error) {
        res.sendStatus(404)
        console.log(error?.sqlMessage)
    }
}

export async function createUser(req: Request, res: Response) {
    const newUser: UserModel = req.body
    const passwordHash = bcrypt.hashSync(newUser.password, 11)
    try {
        const conn = await connect()
        await conn.query(`
            INSERT 
                user 
            SET
                forename = ?,
                surname = ?,
                email = ?,
                password_hash = ?,
                role = ?;`, [newUser.forename, newUser.surname, newUser.email, passwordHash, newUser.role])

        const user: UserModel = await getUserByEmail(newUser.email)
        console.log(user)
        console.log(`Dodat je korisnik ${newUser.forename} ${newUser.surname} sa ulogom ${newUser.role}`)
        res.sendStatus(200)
    } catch (error) {
        console.log(error?.sqlMessage)
    }
}

export async function updateUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const updatedUser: UserModel = req.body
    const passwordHash = bcrypt.hashSync(updatedUser.password, 11)

    try {
        const conn = await connect()
        await conn.query(
            `UPDATE 
                user 
            SET 
                forename = ?,
                surname = ?,
                email = ?,
                password_hash = ?,
                role = ?,
                is_active = ? 
            WHERE user_id = ?;`, 
            [
                updatedUser.forename, 
                updatedUser.surname, 
                updatedUser.email, 
                passwordHash, 
                updatedUser.role,
                updatedUser.isActive,
                id 
            ])
        return res.json({
            message: `Korisnik sa id:${id} je azuriran`
        })
    } catch (error) {
        console.log(error?.sqlMessage)
    }
}

export async function deleteUserById(req: Request, res: Response) {
    const id = req.params.id

    try {
        const conn = await connect()
        await conn.query('DELETE FROM user WHERE user_id = ?;', [id])
        return res.json({
            message: `Korisnik sa id:${id} je obrisan`
        })
    } catch (error) {
        console.log(error?.sqlMessage)
    }
}

export async function loginUser(req: Request, res: Response) {
    const email = req.body.email
    const passwordToCheck = req.body.password
    if(email && passwordToCheck){
        try {
            const conn = await connect()
            const result = await conn.query(`
                SELECT
                    *
                FROM 
                    user 
                WHERE
                    email = ?;`, [email])
            
            //userPassword = result[0][0].password_hash
            if(bcrypt.compareSync(passwordToCheck, result[0][0].password_hash)){
                console.log(`ISTI`)
            }
    
        } catch (error) {
            console.log(error?.sqlMessage)
        }
    }    
}