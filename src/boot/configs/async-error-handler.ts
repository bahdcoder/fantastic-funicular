import { ErrorRequestHandler } from 'express'

/**
 * Global error catcher to catch async errors bubbled up the express app.
 *
 *
 * @param error Error
 * @param request Request
 * @param response Response
 * @param next NextFunction
 */
export const errorHandler: ErrorRequestHandler = (
    error,
    request,
    response,
    next
) => {
    request.log.error(error.message || error)

    return response.status(error.status || 500).json({
        message: `Unexpected API error.`
    })
}
