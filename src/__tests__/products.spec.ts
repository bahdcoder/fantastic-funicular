import Faker from 'faker'
import Supertest from 'supertest'

import boot from '../index'
import { prisma } from '../boot/configs/database'

afterAll(async () => await prisma.$disconnect())

const setup = async () => Supertest(await boot)

describe('<GET /products>', () => {
    test('fetches a list of products for a company', async () => {
        const server = await setup()

        const company = await prisma.company.create({
            data: {
                name: Faker.company.companyName()
            }
        })

        const secondCompany = await prisma.company.create({
            data: {
                name: Faker.company.companyName()
            }
        })

        const firstProductName = Faker.lorem.word()
        const secondProductName = Faker.lorem.word()

        await prisma.product.createMany({
            data: [
                {
                    name: firstProductName,
                    companyId: company.id
                },
                {
                    name: secondProductName,
                    companyId: company.id
                }
            ]
        })

        await prisma.product.createMany({
            data: [
                {
                    name: Faker.lorem.word(),
                    companyId: secondCompany.id
                }
            ]
        })

        const response = await server.get(`/companies/${company.id}/products`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)
        expect(response.body[0].name).toBe(firstProductName)
        expect(response.body[1].name).toBe(secondProductName)
    })

    test('inserts a new product for a company', async () => {
        const server = await setup()

        await prisma.product.deleteMany()
        await prisma.company.deleteMany()

        const company = await prisma.company.create({
            data: {
                name: Faker.company.companyName()
            }
        })

        const productName = Faker.lorem.sentence()

        const response = await server
            .post(`/companies/${company.id}/products`)
            .send({
                name: productName
            })

        expect(response.status).toBe(201)
        expect(response.body.companyId).toBe(company.id)
    })

    test('validates a company id before ', async () => {
        const server = await setup()

        const productName = Faker.lorem.word()

        const response = await server.post(`/companies/999/products`).send({
            name: productName
        })

        expect(response.status).toBe(422)
        expect(response.body).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "companyId",
                "message": "companyExists validation failed on companyId",
                "validation": "companyExists",
              },
            ]
        `)
    })
})
