import { RequestHandler } from 'express'
import { validate } from '../../helpers/validate'

/**
 * Fetch all companies with their related products and customers
 *
 * @param request Request
 * @param response Response
 */
export const fetchCompanies: RequestHandler = async (request, response) => {
    response.json(
        await request.prisma.company.findMany({
            include: {
                products: true,
                customers: true
            }
        })
    )
}

/**
 * Insert a new company. The name of the company is required.
 * This handler validates and sanitizes the incoming data.
 *
 * @param request Request
 * @param response Response
 */
export const insertCompany: RequestHandler = async (request, response) => {
    // Validate incoming data.
    const [passed, payload] = await validate(
        request.body,
        {
            name: 'required|string|max:255'
        },
        {
            name: 'escape'
        }
    )

    if (!passed) {
        return response.status(422).json({
            message: 'Validation failed.',
            errors: payload
        })
    }

    // Insert the company into database using prisma client
    const company = await request.prisma.company.create({
        data: {
            name: payload.name
        }
    })

    return response.status(201).json(company)
}
