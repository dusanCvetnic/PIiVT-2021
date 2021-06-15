import { Request, Response } from "express";
import { SubjectModel } from "../models/subject.model";
import subjectService from "../services/subject.service"

export async function getAllSubjects(req: Request, res: Response): Promise<Response> {
    try {
        return res.send(await subjectService.list(req, res))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getSubjectById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)

    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const subject: SubjectModel = await subjectService.readById(req, res, id)
        if(!subject.subjectId){
            return res.status(404).send('Trazeni predmet nije pronadjen')
        }else{
            return res.send(await subjectService.readById(req, res, id))
        } 
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function createSubject(req: Request, res: Response) {
    
    try {
        return res.send(await subjectService.create(req, res))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateSubjectById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await subjectService.updateById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteSubjectById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await subjectService.deleteById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}