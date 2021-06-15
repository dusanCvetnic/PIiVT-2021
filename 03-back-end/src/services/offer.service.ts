import { Request, Response } from "express";
import { CRUD } from "../common/crud.interface";
import { connect } from "../common/database";
import { OfferModel } from "../models/offer.model";

class OfferService implements CRUD{
    async list(req: Request, res: Response): Promise<OfferModel[]> {
        try {
            const conn = await connect()
            const result = await conn.query(`
            SELECT 
                * 
            FROM 
                offer;`)

            const offers: OfferModel[] = []
            
            for(let row of result[0][Symbol.iterator]()){
                offers.push({
                    offerId: row?.offer_id,
                    price: row?.price,
                    userId: row?.user_id,
                    cityId: row?.city_id,
                    subjectId: row?.subject_id,
                })
            }

            return offers as OfferModel[]
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async create(req: Request, res: Response){
        const newOffer: OfferModel = req.body

        try {
            const conn = await connect()
            
            await conn.query(`
            INSERT 
                offer 
            SET
                price = ?,
                user_id = ?,
                city_id = ?,
                subject_id = ?;`, [newOffer.price, newOffer.userId, newOffer.cityId, newOffer.subjectId])
            
            res.status(200).send(`Dodata je ponuda: ${newOffer.price}`)
        } catch (error) {
            if(error?.sqlMessage.includes('uq_offer_user_id_city_id_subject_id')){
                res.status(400).send({message: "Ova ponuda vec postoji"})
            }else{
                res.status(500).send({error: error?.sqlMessage})
            } 
        }
    }

    async readById(req: Request, res: Response, resourceId: number): Promise<OfferModel>{
        try {
            const conn = await connect()
            const result = await conn.query(`
                SELECT 
                    * 
                FROM 
                    offer 
                WHERE 
                offer_id = ?;`, [resourceId])

            const offer: OfferModel = {
                offerId: result[0][0]?.offer_id,
                price: result[0][0]?.price,
                userId: result[0][0]?.user_id,
                cityId: result[0][0]?.city_id,
                subjectId: result[0][0]?.subject_id,
            }

            return offer
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async updateById(req: Request, res: Response, resourceId: number){
        const updatedOffer: OfferModel = req.body
        try {
            const conn = await connect()
            await conn.query(`
            UPDATE 
                offer 
            SET
                price = ?
            WHERE 
                offer_id = ?;`, [updatedOffer.price, resourceId])

            return `Azurirana je ponuda: ${resourceId}, nova cena: ${updatedOffer.price}`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async deleteById(req: Request, res: Response, resourceId: number) {
        
        try {
            const conn = await connect()
            await conn.query(`
            DELETE FROM 
                offer 
            WHERE 
                offer_id = ?;`, [resourceId])
            return `Ponuda sa id:${resourceId} je obrisana`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }
}

export default new OfferService()