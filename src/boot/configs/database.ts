import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

/**
 * Inject the prisma client into the express request object.
 * This will be available on the request object in
 * other middleware and express controllers.
 *
 * @param request Request
 * @param response Response
 * @param next NextFunction
 */
export const databaseMiddleware: RequestHandler = (request, response, next) => {
    request.prisma = prisma

    next()
}
