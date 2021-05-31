import { CommonRoutesConfig } from "../common/common.routes.config"
import * as express from 'express'

export class UserRoutes extends CommonRoutesConfig{
    constructor(app: express.Application){
        super(app, 'UserRoutes')
    }

    configureRoutes(){
        this.app.route(`/users`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`List of users`)
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Post users`)
            })

        this.app.route(`/users/:uid`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // TODO:
                next()
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET request for user with id ${req.params.uid}`)
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT request for user with id ${req.params.uid}`)
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH request for user with id ${req.params.uid}`)
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE request for user with id ${req.params.uid}`)
            })

        return this.app
    }
}