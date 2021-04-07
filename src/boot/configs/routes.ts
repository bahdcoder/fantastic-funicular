import { Application } from 'express'
import AsyncHandler from 'express-async-handler'
import { fetchProducts, insertProduct } from '../../controllers/products'
import { insertCompany, fetchCompanies } from '../../controllers/companies'

/**
 *
 * Register all the routes in the application.
 */
export const routes: (app: Application) => void = app => {
    // Register route to fetch all products in a company
    app.get('/companies/:id/products', AsyncHandler(fetchProducts))

    // Register route to insert a new product for a company
    app.post('/companies/:id/products', AsyncHandler(insertProduct))

    // Register route to insert a new company
    app.post('/companies', AsyncHandler(insertCompany))

    // Register route to fetch all companies
    app.get('/companies', AsyncHandler(fetchCompanies))
}
