import { Request, Response } from "express";
import { connect } from "../common/database";
import { SubjectModel } from "../models/subject.model";

export async function getAllSubjects(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM subject;')
        return res.json(result[0])
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getSubjectById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM subject WHERE subject_id = ?;', [id])
        return res.json(result[0])
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function createSubject(req: Request, res: Response) {
    const newSubject: SubjectModel = req.body
    try {
        const conn = await connect()
        await conn.query(`
            INSERT 
                subject 
            SET
                name = ?;`, [newSubject.name])
        res.sendStatus(200)
        console.log(`Dodat je predmet ${newSubject.name}`)
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateSubjectById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')
    const updatedSubject: SubjectModel = req.body

    try {
        const conn = await connect()
        await conn.query('UPDATE subject SET name = ? WHERE subject_id = ?;', [updatedSubject.name, id])
        return res.json({
            message: `Predmet sa id:${id} je azuriran`
        })
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteSubjectById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const conn = await connect()
        await conn.query('DELETE FROM subject WHERE subject_id = ?;', [id])
        return res.json({
            message: `Predmet sa id:${id} je obrisan`
        })
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}