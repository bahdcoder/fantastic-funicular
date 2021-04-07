import { RequestHandler } from 'express'
import AsyncHandler from 'express-async-handler'

export type ControllerHandler = () => RequestHandler

export const controller = (handler: ControllerHandler) =>
    AsyncHandler(handler())
