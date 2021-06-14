import { Request, Response } from "express";
import { connect } from "../common/database";
import { ReviewModel } from "../models/review.model";
import reviewService from "../services/review.service"

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

export async function getReviewByRatedUserIdAndUserWhoRatedId(req: Request, res: Response): Promise<ReviewModel>  {
    //const ruid = +(req.params.ruid)
    //const uwrid = +(req.params.uwrid)
    
    //if (ruid <= 0 || uwrid <= 0) return null

    try {
        
        //const conn = await connect()
        //const result = await conn.query('SELECT * FROM review WHERE rated__user_id = ? AND user_id = ?;', [ruid, uwrid])
        
        //const review: ReviewModel = {
        ////    reviewId: result[0][0]?.review_id,
        //    rating: result[0][0]?.rating
        //}
        
        return await reviewService.getReviewByBothUserId(req, res)
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function createReview(req: Request, res: Response) {
    const ratedUserId = +(req.params.ruid)
    const userWhoRatedId = +(req.params.uwrid)
    const rate = +(req.params.rate)

    if(rate < 1 || rate > 5){
        return res.status(400).send('Nemoguca ocena')
    }
    
    if (ratedUserId <= 0 || userWhoRatedId <= 0) return res.status(400).send('ID ne moze biti manji od 1')
    //const newReview: ReviewModel = req.body
    try {
        return await reviewService.create(req, res)
        /* const conn = await connect()
        await conn.query(`
            INSERT 
                review 
            SET
                rating = ?,
                rated__user_id = ?,
                user_id = ?;`, [rate, ratedUserId, userWhoRatedId])

        res.sendStatus(200)

        console.log(`Dodata je ocena: ${rate}, ocenjen je korisnik sa id: ${ratedUserId}, ocenio je korisnik sa id: ${userWhoRatedId}`) */
    } catch (error) {
        if(error?.sqlMessage.includes("uq_review_rated__user_id_user_id")){
            res.status(400).send({message: "Ovaj korisik je vec ocenjen od strane datog studenta"})
        }else{
            res.status(500).send({error: error?.sqlMessage})
        }      
    }
}

export async function updateReviewByRatedUserIdAndUserWhoRatedId(req: Request, res: Response): Promise<Response> {
    try {
        console.log("1")
        const rId = (await getReviewByRatedUserIdAndUserWhoRatedId(req, res))?.reviewId
        if(rId){
            console.log("2")
            return await updateReviewById(rId, req, res)
        }else{
            console.log("3")
            return await createReview(req, res)
        }
        
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateReviewById(id: number, req: Request, res: Response): Promise<Response> {
    //const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')
    const rate = +(req.params.rate)

    if(rate < 1 || rate > 5){
        return res.status(400).send('Nemoguca ocena')
    }
    //const updatedReview: ReviewModel = req.body

    try {
        /* const conn = await connect()
        await conn.query(`
            UPDATE 
                review 
            SET
                rating = ?
            WHERE 
                review_id = ?;`, [+(req.params.rate), id]) */
        return res.send(await reviewService.updateById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteReviewById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        //const conn = await connect()
        //await conn.query('DELETE FROM review WHERE review_id = ?;', [id])
        return res.send(await reviewService.deleteById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}