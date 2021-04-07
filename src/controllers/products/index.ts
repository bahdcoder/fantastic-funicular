import { RequestHandler } from 'express'
import { validate } from '../../helpers/validate'

/**
 * Fetch all products for a company ID
 *
 * @param request Request
 * @param response Response
 */
export const fetchProducts: RequestHandler = async (request, response) => {
    response.json(
        await request.prisma.product.findMany({
            where: {
                companyId: parseInt(request.params.id)
            }
        })
    )
}

/**
 * Insert a new product into storage
 * 
 * @param request Request
 * @param response Response
 */
export const insertProduct: RequestHandler = async (request, response) => {
    // Validate incoming data.
    const [passed, payload] = await validate(
        {
            name: request.body.name,
            companyId: request.params.id
        },
        {
            name: 'required|string|max:255',
            companyId: 'required|number|company_exists'
        },
        {
            name: 'escape',
            companyId: 'trim'
        }
    )

    if (! passed) {
        return response.status(422).json(payload)
    }

    const product = await request.prisma.product.create({
        data: payload
    })

    return response.status(201).json(product)
}
