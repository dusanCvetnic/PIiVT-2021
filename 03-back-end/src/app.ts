import * as express from "express";
import * as cors from "cors";
import cityRoutes from "./routes/city.routes"


export class App {
    private app: express.Application

    constructor(private port?: number){
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
        this.afterAll()
    }

    settings() {
        this.app.set('port', this.port || 5000)
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes(){
        this.app.use('/cities', cityRoutes)
    }

    afterAll(){
        this.app.use((req, res) => {res.sendStatus(404)})
    }

    async listen(){
        await this.app.listen(this.app.get('port'))
        console.log(`Server se pokrenuo na http://localhost${this.app.get('port')}`)
    }
}