import Express from 'express'

import boot from './boot/boot'
import register from './boot/register'

const app = Express()

/**
 *
 * Register the middleware on the express application
 */
register(app)

export default boot(app)
