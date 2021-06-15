import { Request, Response } from "express";
import { CityModel } from "../models/city.model";
import cityService from "../services/city.service"

export async function getAllCities(req: Request, res: Response) : Promise<Response>  {
    try {
        return res.send(await cityService.list(req, res)) 
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function getCityById(req: Request, res: Response) : Promise<Response>{
    const id = +(req.params.id)
    
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        const city: CityModel = await cityService.readById(req, res, id)

        if(!city.cityId){
            return res.status(404).send('Trazeni grad nije pronadjen')
        }else{
            return res.send(await cityService.readById(req, res, id))
        }  
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function createCity(req: Request, res: Response) : Promise<Response> {
    
    try {
        return res.send(await cityService.create(req, res))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function updateCityById(req: Request, res: Response): Promise<Response> {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await cityService.updateById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}

export async function deleteCityById(req: Request, res: Response) {
    const id = +(req.params.id)
    if (id <= 0) return res.status(400).send('ID ne moze biti manji od 1')

    try {
        return res.send(await cityService.deleteById(req, res, id))
    } catch (error) {
        res.status(500).send({error: error?.sqlMessage})
    }
}