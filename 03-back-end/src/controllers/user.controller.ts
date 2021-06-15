import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import * as bcrypt from "bcrypt";
import userService from '../services/user.service';

export async function getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
        return res.send(await userService.list(req,res))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getUserById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await userService.readById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        return res.send(await userService.create(req, res))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateUserById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await userService.updateById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteUserById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await userService.deleteById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function registerUser(req: Request, res: Response) {
    try {
        return await userService.register(req, res)
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}