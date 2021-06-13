import { Request, Response } from 'express';
import { connect } from "../common/database";
import { UserModel } from '../models/user.model';
import * as bcrypt from "bcrypt";

export async function getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM user;')

        if(result[0][0] === undefined){
            return res.status(404).send('Ne postoje korisnici')
        }

        return res.json(result[0])
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
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

export async function getUserById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM user WHERE user_id = ?;', [id])
        const rating = await conn.query(`
            SELECT
                AVG(rating) 'averageRating'
            FROM
                review
            WHERE
                rated__user_id = ?;`, [id])
        
        if(result[0][0] === undefined){
            return res.status(404).send('Trazeni korisnik ne postoji')
        }
        
        const user: UserModel = {
            userId: result[0][0].user_id,
            forename: result[0][0].forename,
            surname: result[0][0].surname,
            email: result[0][0].email,
            password: result[0][0].password_hash,
            role: result[0][0].role,
            rating: Number(rating[0][0].averageRating)
        }
        
        return res.json(user)
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
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
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateUserById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')
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
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteUserById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const conn = await connect()
        await conn.query('DELETE FROM user WHERE user_id = ?;', [id])
        return res.json({
            message: `Korisnik sa id:${id} je obrisan`
        })
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
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
            res.status(500).send({error: error?.sqlMessage})
        }
    }    
}