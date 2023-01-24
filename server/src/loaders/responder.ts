import Logger from "./logger"
import { IResponder } from "@/interfaces/IResponder"

export default ({ res, statusCode, message, body }:IResponder) => {
    Logger.info(message)
    return res.status(statusCode).json({
        meta: {
            success: statusCode >= 200 && statusCode < 300 ? true : false,
            message
        },
        body
    })
}