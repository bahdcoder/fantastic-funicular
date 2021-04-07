import { RequestHandler } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'

/**
 *
 * Create a new rate limiter instance.
 * Ideally points and duration should be configured using
 * environment variables, as different environments might
 * have different rate limits.
 *
 */
export const rateLimiter = new RateLimiterMemory({
    points: 20, // 2 api requests
    duration: 1 // per second
})

/**
 * Express middleware to limit API calls by IP address.
 *
 * @param request Request
 * @param response Response
 * @param next NextFunction
 */
export const rateLimiterMiddleware: RequestHandler = (
    request,
    response,
    next
) => {
    rateLimiter
        .consume(request.ip)
        .then(() => {
            return next()
        })
        .catch(() => {
            response.status(429).json(`Slooow down, buddy.`)
        })
}
