import { Response } from "express"

export interface IResponder {
    res: Response;
    statusCode: number;
    message: string;
    body: any
}