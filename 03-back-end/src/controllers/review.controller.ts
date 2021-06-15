import { Request, Response } from "express";
import { ReviewModel } from "../models/review.model";
import reviewService from "../services/review.service"

export async function getAllReviews(req: Request, res: Response): Promise<Response> {
    try {
        return res.send(await reviewService.list(req, res))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getReviewById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const review: ReviewModel = await reviewService.readById(req, res, id)

        if(!review.reviewId){
            return res.status(404).send('Trazeni review nije pronadjen')
        }else{
            return res.send(await reviewService.readById(req, res, id))
        } 
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getReviewByRatedUserIdAndUserWhoRatedId(req: Request, res: Response): Promise<ReviewModel>  {
    try {
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
    
    try {
        return await reviewService.create(req, res)
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
        const rId = (await getReviewByRatedUserIdAndUserWhoRatedId(req, res))?.reviewId
        if(rId){
            return await updateReviewById(rId, req, res)
        }else{
            return await createReview(req, res)
        }
        
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateReviewById(id: number, req: Request, res: Response): Promise<Response> {
    
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')
    const rate = +(req.params.rate)

    if(rate < 1 || rate > 5){
        return res.status(400).send('Nemoguca ocena')
    }

    try {
        return res.send(await reviewService.updateById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteReviewById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await reviewService.deleteById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}