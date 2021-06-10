import * as express from "express"
import * as cors from "cors"
import { CommonRoutesConfig } from "./common/common.routes.config"

const app: express.Application = express()
const port: Number = 5000
const routes: Array<CommonRoutesConfig> = []

// Dodavanje middleware za parsiranje JSON-a
app.use(express.json())

// Dodavanje middleware za cross-origin requests
app.use(cors())

// Dodavanje ruta
//routes.push(new CityRoutes(app))

// Poruka za adresu servera
const message = `Server radi na http://localhost:${port}`

//Test ruta
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(message)
})

app.use((req, res) => {
    res.sendStatus(404)
})

// Pokretanje osluskivanja
app.listen(port, () => {
    //routes.forEach((route: CommonRoutesConfig) => {
        // Poruka za konfiguracije ruta (Samo za potrebe razvoja)
        //console.log(`Ruta se konfigurisala za ${route.getName()}`)
    //})

    console.log(message)
})