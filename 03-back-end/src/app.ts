import * as express from "express"
import * as cors from "cors"
import { CommonRoutesConfig } from "./common/common.routes.config"
import { UserRoutes } from "./users/users.routes.config"

const app: express.Application = express()
const port: Number = 5000
const routes: Array<CommonRoutesConfig> = []

// Dodavanje middleware za parsiranje JSON-a
app.use(express.json())

// Dodavanje middleware za cross origin requests
app.use(cors())

// Dodavanje ruta u niz ruta
routes.push(new UserRoutes(app))

const message = `Server radi na http://localhost:${port}`
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(message)
})

app.use((req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Ruta se konfigurisala za ${route.getName()}`)
    })

    console.log(message)
})