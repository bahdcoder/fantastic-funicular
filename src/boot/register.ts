import Pino from 'express-pino-logger'
import Express, { Application } from 'express'

import { routes } from './configs/routes'
import { databaseMiddleware } from './configs/database'
import { errorHandler } from './configs/async-error-handler'
import { rateLimiterMiddleware } from './configs/rate-limiter'

/**
 * Register all the middleware on the express application
 *
 * @param app Application
 */
export const register = (app: Application) => {
    // Register application logger
    app.use(Pino({
        autoLogging: process.env.NODE_ENV === 'production'
    }))

    // Register the body parser middleware
    app.use(Express.json())

    // Register API rate limiter middleware
    app.use(rateLimiterMiddleware)

    // Register the database middleware.
    app.use(databaseMiddleware)

    // Register all routes in the application
    routes(app)

    // Register async global error handler
    app.use(errorHandler)
}

export default register
