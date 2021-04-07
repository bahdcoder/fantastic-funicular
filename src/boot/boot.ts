import { Application } from 'express'

/**
 * Boot the application services, caching drivers, 3rd party APIs,
 * or other async operations at startup time
 *
 * @param app Application
 *
 */
const boot = async (app: Application) => {
    return app
}

export default boot
