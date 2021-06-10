/* import { ICityDto } from "../dto/city/city.dto";
import dbConfig from "../common/db.config";



class CityDao {

    async getAllCities(params: string): Promise<ICityDto[]> {

        var connection = await mysql.createConnection(dbConfig)

        let [rows, fields] = await connection.execute('SELECT * FROM city;')

        let cities: ICityDto[] = []
        for(const row of rows){

        }


        
    }

    async addCity(city: ICityDto) {
        // TODO
    }
}

export default new CityDao() */