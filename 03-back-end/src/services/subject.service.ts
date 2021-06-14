import { Request, Response } from "express";
import { CRUD } from "../common/crud.interface";
import { connect } from "../common/database";
import { SubjectModel } from "../models/subject.model";

class SubjectService implements CRUD{
    async list(req: Request, res: Response): Promise<SubjectModel[]> {
        try {
            const conn = await connect()
            const result = await conn.query(`
            SELECT 
                * 
            FROM 
                subject;`)

            const subjects: SubjectModel[] = []
            
            for(let row of result[0][Symbol.iterator]()){
                subjects.push({
                    subjectId: row?.subject_id,
                    name: row?.name
                })
            }

            return subjects as SubjectModel[]
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async create(req: Request, res: Response){
        const newSubject: SubjectModel = req.body
        try {
            const conn = await connect()
            
            await conn.query(`
                INSERT 
                    subject 
                SET
                    name = ?;`, [newSubject.name])
            res.status(200).send(`Dodat je predmet: ${newSubject.name}`)
        } catch (error) {
            if(error?.sqlMessage.includes('uq_subject_name')){
                res.status(404).send('Postoji predmet sa takvim nazivom')
            }else{
                res.status(500).send({error: error?.sqlMessage})
            }
        }
    }

    async readById(req: Request, res: Response, resourceId: number): Promise<SubjectModel>{
        try {
            const conn = await connect()
            const result = await conn.query(`
                SELECT 
                    * 
                FROM 
                    subject 
                WHERE 
                    subject_id = ?;`, [resourceId])

            const subject: SubjectModel = {
                subjectId: result[0][0]?.subject_id,
                name: result[0][0]?.name,
            }
            return subject
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async updateById(req: Request, res: Response, resourceId: number){
        const updatedSubject: SubjectModel = req.body
        try {
            const conn = await connect()
            await conn.query(`
            UPDATE 
                subject 
            SET 
                name = ? 
            WHERE 
                subject_id = ?;`, [updatedSubject.name, resourceId])

            return `Predmet sa id:${resourceId} je azuriran`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async deleteById(req: Request, res: Response, resourceId: number) {
        
        
        try {
            const conn = await connect()
            await conn.query(`
            DELETE FROM 
                subject 
            WHERE 
                subject_id = ?;`, [resourceId])
            return `Predmet sa id:${resourceId} je obrisan`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }
}

export default new SubjectService()