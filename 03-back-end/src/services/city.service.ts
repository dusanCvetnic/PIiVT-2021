import { json, Request, Response } from "express";
import { CRUD } from "../common/crud.interface";
import { connect } from "../common/database";
import { CityModel } from "../models/city.model";

class CityService implements CRUD{
    async list(req: Request, res: Response): Promise<CityModel[]> {
        try {
            const conn = await connect()
            const result = await conn.query('SELECT * FROM city;')
            const cities: CityModel[] = []
            
            for(let row of result[0][Symbol.iterator]()){
                cities.push({
                    cityId: row?.city_id,
                    name: row?.name
                })
            }

            return cities as CityModel[]
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async create(req: Request, res: Response){
        const newCity: CityModel = req.body
        try {
            const conn = await connect()
            
            await conn.query(`
                INSERT 
                    city 
                SET
                    name = ?;`, [newCity.name])

        } catch (error) {
            if(error?.sqlMessage.includes('uq_city_name')){
                res.status(404).send('Postoji grad sa takvim imenom')
            }else{
                res.status(500).send({error: error?.sqlMessage})
            }
        }
    }

    async readById(req: Request, res: Response, resourceId: number): Promise<CityModel>{
        try {
            const conn = await connect()
            const result = await conn.query(`
                SELECT 
                    * 
                FROM 
                    city 
                WHERE 
                    city_id = ?;`, [resourceId])

            const city: CityModel = {
                cityId: result[0][0]?.city_id,
                name: result[0][0]?.name,
            }
            return city
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async updateById(req: Request, res: Response, resourceId: number){
        const updatedCity: CityModel = req.body
        try {
            const conn = await connect()
            await conn.query(`
            UPDATE 
                city 
            SET 
                name = ? 
            WHERE 
                city_id = ?;`, [updatedCity.name, resourceId])

            return `Grad sa id:${resourceId} je azuriran`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async deleteById(req: Request, res: Response, resourceId: number) {
        
        
        try {
            const conn = await connect()
            await conn.query(`
            DELETE FROM 
                city 
            WHERE 
                city_id = ?;`, [resourceId])
            return `Grad sa id:${resourceId} je obrisan`
        } catch (error) {
            res.status(500).send({error: error?.sqlMessage})
        }
    }

    async getByName(){

    }

}

export default new CityService()