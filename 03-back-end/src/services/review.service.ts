import { Request, Response } from "express";
import { CRUD } from "../common/crud.interface";
import { connect } from "../common/database";
import { ReviewModel } from "../models/review.model";

class ReviewService implements CRUD{
    async list(req: Request, res: Response): Promise<ReviewModel[]> {
        try {
            const conn = await connect()
            const result = await conn.query(`
            SELECT 
                * 
            FROM 
                review;`)

            const reviews: ReviewModel[] = []
            
            for(let row of result[0][Symbol.iterator]()){
                reviews.push({
                    reviewId: row?.review_id,
                    rating: row?.rating,
                    ratedUserId: row?.rated__user_id,
                    userWhoRatedId: row?.user_id,
                })
            }

            return reviews as ReviewModel[]
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async create(req: Request, res: Response){
        //const newReview: ReviewModel = req.body
        const ratedUserId = +(req.params.ruid)
        const userWhoRatedId = +(req.params.uwrid)
        const rate = +(req.params.rate)

        if(rate < 1 || rate > 5){
            return res.status(400).send('Nemoguca ocena')
        }

        if (ratedUserId <= 0 || userWhoRatedId <= 0) return res.status(400).send('ID ne moze biti manji od 1')

        try {
            const conn = await connect()
            
            await conn.query(`
            INSERT 
                review 
            SET
                rating = ?,
                rated__user_id = ?,
                user_id = ?;`, [rate, ratedUserId, userWhoRatedId])
            
            res.status(200).send(`Dodata je ocena: ${rate}, ocenjen je korisnik sa id: ${ratedUserId}, ocenio je korisnik sa id: ${userWhoRatedId}`)
        } catch (error) {
            if(error?.sqlMessage.includes('uq_review_rated__user_id_user_id')){
                res.status(400).send({message: "Ovaj korisik je vec ocenjen od strane datog studenta"})
            }else{
                res.status(500).send({error: error?.sqlMessage})
            } 
        }
    }

    async readById(req: Request, res: Response, resourceId: number): Promise<ReviewModel>{
        try {
            const conn = await connect()
            const result = await conn.query(`
                SELECT 
                    * 
                FROM 
                    review 
                WHERE 
                    review_id = ?;`, [resourceId])

            const review: ReviewModel = {
                reviewId: result[0][0]?.review_id,
                rating: result[0][0]?.rating,
                ratedUserId: result[0][0]?.rated__user_id,
                userWhoRatedId: result[0][0]?.user_id
            }
            return review
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async updateById(req: Request, res: Response, resourceId: number){
        //const updatedReview: ReviewModel = req.body
        const rate = +(req.params.rate)
        try {
            const conn = await connect()
            await conn.query(`
            UPDATE 
                review 
            SET
                rating = ?
            WHERE 
                review_id = ?;`, [rate, resourceId])

            return `Azurirana je ocena: ${rate}, ocenjen je korisnik sa id: ${req.params.ruid}, ocenio je korisnik sa id: ${req.params.uwrid}`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async deleteById(req: Request, res: Response, resourceId: number) {
        
        
        try {
            const conn = await connect()
            await conn.query(`
            DELETE FROM 
                review 
            WHERE 
                review_id = ?;`, [resourceId])
            return `Ocena sa id:${resourceId} je obrisana`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async getReviewByBothUserId(req: Request, res: Response): Promise<ReviewModel> {
        const ruid = +(req.params.ruid)
        const uwrid = +(req.params.uwrid)
        if (ruid <= 0 || uwrid <= 0) return null
        try {
        
            const conn = await connect()
            const result = await conn.query(`
            SELECT 
                * 
            FROM 
                review 
            WHERE 
                rated__user_id = ? 
            AND 
                user_id = ?;`, [ruid, uwrid])
            
            const review: ReviewModel = {
                reviewId: result[0][0]?.review_id,
                rating: result[0][0]?.rating
            }
            
            return review
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }


}

export default new ReviewService()