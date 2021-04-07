import Faker from 'faker'
import Supertest from 'supertest'

import { Company } from '@prisma/client'

import boot from '../index'
import { prisma } from '../boot/configs/database'

afterAll(async () => await prisma.$disconnect())

const setup = async () => Supertest(await boot)

describe('<POST /companies>', () => {
    test('validates and sanitizes company data before inserting into database', async () => {
        const server = await setup()

        const response = await server.post('/companies').send({})

        expect(response.status).toBe(422)
        expect(response.body).toMatchInlineSnapshot(`
            Object {
              "errors": Array [
                Object {
                  "field": "name",
                  "message": "required validation failed on name",
                  "validation": "required",
                },
              ],
              "message": "Validation failed.",
            }
        `)
    })

    test('inserts a new company to the database when valid data is provided', async () => {
        const companyName = Faker.company.companyName()

        await prisma.product.deleteMany()
        await prisma.company.deleteMany()

        const server = await setup()

        const response = await server.post('/companies').send({
            name: companyName
        })

        expect(response.status).toBe(201)
        expect(response.body.name).toBe(companyName)

        const insertedCompany = await prisma.company.findFirst({
            where: {
                name: companyName
            }
        })

        expect(insertedCompany?.id).toBe(response.body.id)
    })
})

describe('<GET /companies>', () => {
    test('fetches a list of stored companies', async () => {
        const server = await setup()

        const firstCompanyName = Faker.company.companyName()
        const secondCompanyName = Faker.company.companyName()

        await prisma.company.createMany({
            data: [{
                name: firstCompanyName
            }, {
                name: secondCompanyName
            }]
        })

        const response = await server.get('/companies')

        expect(response.status).toBe(200)

        const allCompanies = await prisma.company.findMany()

        expect(response.body.length).toBe(allCompanies.length)
        expect(response.body.find((company: Company) => company.name === firstCompanyName)?.name).toBeTruthy()
        expect(response.body.find((company: Company) => company.name === secondCompanyName)?.name).toBeTruthy()
    })
})
