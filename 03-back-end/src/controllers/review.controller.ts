import { Request, Response } from "express";
import { connect } from "../common/database";
import { ReviewModel } from "../models/review.model";

export async function getAllReviews(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM review;')
        return res.json(result[0])
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getReviewById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM review WHERE review_id = ?;', [id])
        return res.json(result[0])
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function createReview(req: Request, res: Response) {
    const newReview: ReviewModel = req.body
    try {
        const conn = await connect()
        await conn.query(`
            INSERT 
                review 
            SET
                rating = ?,
                rated__user_id = ?,
                user_id = ?;`, [newReview.rating, newReview.ratedUserId, newReview.userWhoRatedId])

        res.sendStatus(200)

        console.log(`Dodata je ocena: ${newReview.rating}, ocenjen je korisnik sa id: ${newReview.ratedUserId}, ocenio je korisnik sa id: ${newReview.userWhoRatedId}`)
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateReviewById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    const updatedReview: ReviewModel = req.body

    try {
        const conn = await connect()
        await conn.query(`
            UPDATE 
                review 
            SET
                rating = ?,
                rated__user_id = ?,
                user_id = ?;`, [updatedReview.rating, updatedReview.ratedUserId, updatedReview.userWhoRatedId])
        return res.json({
            message: `Azurirana je ocena: ${updatedReview.rating}, ocenjen je korisnik sa id: ${updatedReview.ratedUserId}, ocenio je korisnik sa id: ${updatedReview.userWhoRatedId}`
        })
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteReviewById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const conn = await connect()
        await conn.query('DELETE FROM review WHERE review_id = ?;', [id])
        return res.json({
            message: `Ocena sa id:${id} je obrisana`
        })
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}