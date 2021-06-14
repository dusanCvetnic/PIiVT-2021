import { Request, Response } from "express";
import { CRUD } from "../common/crud.interface";
import { connect } from "../common/database";
import { UserModel } from "../models/user.model";
import { CityModel } from "../models/city.model";
import { SubjectModel } from "../models/subject.model";
import * as bcrypt from "bcrypt";

class UserService implements CRUD{
    async list(req: Request, res: Response): Promise<UserModel[]>{
        try {
            const conn = await connect()
            const result = await conn.query(`
            SELECT 
                * 
            FROM 
                user;`)

            const users: UserModel[] = []
            
            for(let row of result[0][Symbol.iterator]()){
                users.push({
                    userId: row?.user_id,
                    forename: row?.forename,
                    surname: row?.surname,
                    email: row?.email,
                    password: row?.password_hash,
                    role: row?.role,
                    isActive: row?.isActive,
                })
            }

            return users as UserModel[]
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async create(req: Request, res: Response){
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

            const user: UserModel = await this.readByEmail(req, res, newUser.email)
            console.log(`Dodat je korisnik ${newUser.forename} ${newUser.surname} sa ulogom ${newUser.role}`)
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async readById(req: Request, res: Response, resourceId: number): Promise<UserModel|Response>{
        try {
            const conn = await connect()
            const result = await conn.query(`
                SELECT 
                    * 
                FROM 
                    user 
                WHERE 
                    user_id = ?;`, [resourceId])
            
            if(result[0][0] === undefined){
                res.status(404).send('Trazeni korisnik ne postoji')
            }else{
                const rating = await conn.query(`
                SELECT
                    AVG(rating) 'averageRating'
                FROM
                    review
                WHERE
                    rated__user_id = ?;`, [resourceId])

                if(result[0][0].role === 'professor'){
                    const user: UserModel = {
                        userId: result[0][0]?.user_id,
                        forename: result[0][0]?.forename,
                        surname: result[0][0]?.surname,
                        email: result[0][0]?.email,
                        password: result[0][0]?.password_hash,
                        role: result[0][0]?.role,
                        isActive: result[0][0]?.isActive,
                        rating: Number(rating[0][0].averageRating)
                    }
                    return user
                }else{
                    const user: UserModel = {
                        userId: result[0][0]?.user_id,
                        forename: result[0][0]?.forename,
                        surname: result[0][0]?.surname,
                        email: result[0][0]?.email,
                        password: result[0][0]?.password_hash,
                        role: result[0][0]?.role,
                        isActive: result[0][0]?.isActive
                    }
                    return user
                }   
            }    
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async updateById(req: Request, res: Response, resourceId: number){
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
                    resourceId 
                ])
            return `Korisnik sa id:${resourceId} je azuriran`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async deleteById(req: Request, res: Response, resourceId: number) {
        try {
            const conn = await connect()
            await conn.query(`DELETE FROM user_city WHERE user_id = ?`, [resourceId])
            await conn.query(`DELETE FROM user_subject WHERE user_id = ?`, [resourceId])
            await conn.query(`DELETE FROM review WHERE user_id = ? OR rated__user_id = ?`, [resourceId, resourceId])
            await conn.query(`DELETE FROM user WHERE user_id = ?;`, [resourceId])
            return `Korisnik sa id:${resourceId} je obrisan`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async readByEmail(req: Request, res: Response, resource: string): Promise<UserModel>{
        try {
            const conn = await connect()
            const result = await conn.query(`
                SELECT 
                    * 
                FROM 
                    user 
                WHERE 
                    email = ?;`, [resource])

            if(result[0][0] === undefined){
                res.status(404).send('Trazeni korisnik ne postoji')
            }

            const user: UserModel = {
                userId: result[0][0]?.user_id,
                forename: result[0][0]?.forename,
                surname: result[0][0]?.surname,
                email: result[0][0]?.email,
                password: result[0][0]?.password_hash,
                role: result[0][0]?.role,
                isActive: result[0][0]?.isActive,
            }

            return user
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async login(req: Request, res: Response, resource: string){

    }
    //VALUES
	//('AI for Marketing','2019-08-01','2019-12-31'),
	//('AI for Marketing','2019-08-01','2019-12-31'),...
    async register(req: Request, res: Response){
        const data = req.body
        const passwordHash = bcrypt.hashSync(data.user.password, 11)
        
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
                    role = ?;`, [data.user.forename, data.user.surname, data.user.email, passwordHash, data.user.role])

            const newUser: UserModel = await this.readByEmail(req, res, data.user.email)

            let connectCitiesQuery: string = `INSERT INTO user_city(user_id, city_id) VALUES`
            let connectSubjectsQuery: string = `INSERT INTO user_subject(user_id, subject_id) VALUES`
            
            for(let c of data?.cities){
                connectCitiesQuery += `(${newUser.userId},${c?.cityId}),`
            }
            let finalCityQuery = connectCitiesQuery.slice(0, -1)
            finalCityQuery += `;`
    
            for(let s of data?.subjects){
                connectSubjectsQuery += `(${newUser.userId},${s?.subjectId}),`
            }
            let finalSubjectQuery = connectSubjectsQuery.slice(0, -1)
            finalSubjectQuery += `;`
            
            await conn.query(finalCityQuery)
            await conn.query(finalSubjectQuery)
            return res.send(this.readByEmail(req, res, data.user.email))
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }
}

export default new UserService()