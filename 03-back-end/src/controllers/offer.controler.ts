import { Request, Response } from "express";
import offerService from "../services/offer.service";
import { OfferModel } from "../models/offer.model";

export async function getAllOffers(req: Request, res: Response): Promise<Response> {
    try {
        return res.send(await offerService.list(req, res))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getOfferById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const offer: OfferModel = await offerService.readById(req, res, id)

        if(!offer.offerId){
            return res.status(404).send('Trazena ponuda nije pronadjena')
        }else{
            return res.send(await offerService.readById(req, res, id))
        } 
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function createOffer(req: Request, res: Response) {
    
    try {
        return await offerService.create(req, res)
    } catch (error) {
        if(error?.sqlMessage.includes('uq_offer_user_id_city_id_subject_id')){
            res.status(400).send({message: "Ova ponuda vec postoji"})
        }else{
            res.status(500).send({error: error?.sqlMessage})
        }     
    }
}

export async function updateOfferById(req: Request, res: Response): Promise<Response> {
    
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await offerService.updateById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteOfferById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await offerService.deleteById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}