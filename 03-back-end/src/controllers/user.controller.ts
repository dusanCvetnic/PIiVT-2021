import { Request, Response } from "express";
import { connect } from "../common/database";
import { UserModel } from "../models/user.model";
import * as bcrypt from "bcrypt";

export async function getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM user;')
        return res.json(result[0])
    } catch (error) {
        res.sendStatus(500)
        console.log(error?.sqlMessage)
    }
}

export async function getUserById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM user WHERE user_id = ?;', [id])
        return res.json(result[0])
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
        res.sendStatus(200)
        console.log(`Dodat je korisnik ${newUser.forename} ${newUser.surname} sa ulogom ${newUser.role}`)
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