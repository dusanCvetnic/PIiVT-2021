import { Request, Response } from "express";
import { connect } from "../common/database";
import { CityModel } from "../models/city.model";

export async function getAllCities(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM city;')
        return res.json(result[0])
    } catch (error) {
        res.sendStatus(500)
        console.log(error?.sqlMessage)
    }
}

export async function getCityById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    try {
        const conn = await connect()
        const result = await conn.query('SELECT * FROM city WHERE city_id = ?;', [id])
        return res.json(result[0])
    } catch (error) {
        res.sendStatus(500)
        console.log(error?.sqlMessage)
    }
}

export async function createCity(req: Request, res: Response) {
    const newCity: CityModel = req.body
    try {
        const conn = await connect()
        await conn.query(`
            INSERT 
                city 
            SET
                name = ?;`, [newCity.name])
        res.sendStatus(200)
        console.log(`Dodat je grad ${newCity.name}`)
    } catch (error) {
        res.sendStatus(500)
        console.log(error?.sqlMessage)
    }
}

export async function updateCityById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const updatedCity: CityModel = req.body

    try {
        const conn = await connect()
        await conn.query('UPDATE city SET name = ? WHERE city_id = ?;', [updatedCity.name, id])
        return res.json({
            message: `Grad sa id:${id} je azuriran`
        })
    } catch (error) {
        res.sendStatus(500)
        console.log(error?.sqlMessage)
    }
}

export async function deleteCityById(req: Request, res: Response) {
    const id = req.params.id

    try {
        const conn = await connect()
        await conn.query('DELETE FROM city WHERE city_id = ?;', [id])
        return res.json({
            message: `Grad sa id:${id} je obrisan`
        })
    } catch (error) {
        res.sendStatus(500)
        console.log(error?.sqlMessage)
    }
}