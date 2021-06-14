import { Request, Response } from "express";

export interface CRUD {
    list: (req: Request, res: Response) => Promise<any>,
    create: (req: Request, res: Response) => Promise<any>,
    readById: (req: Request, res: Response, resourceId: any) => Promise<any>,
    updateById: (req: Request, res: Response, resourceId: any) => Promise<string>,
    deleteById: (req: Request, res: Response, resourceId: any) => Promise<string>
}