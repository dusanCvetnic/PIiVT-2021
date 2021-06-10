import { CityModel } from "../models/city.model"
import* as mysql from "mysql2/promise"
import dbConfig from "../common/db.config"
import IMessageResponse from "../common/IMessageResponse"

export default abstract class CityService {

    private static sqlConfig = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'dcvetnic',
        database: 'privatnicasovi',
        charset: 'utf8',
        timezone: '+01:00',
    }

    public static async getAllCities(): Promise<CityModel[]> {
        const connection = await mysql.createConnection(this.sqlConfig)
        let [rows, fields] = await connection.execute('SELECT * FROM city')
        let list: CityModel[] = []
        if(Array.isArray(rows)){
            for(const row of rows){
                list.push(<CityModel>row)
            }
        }

        return list
        
    }
}