import { getValue } from 'indicative-utils'
import { extend } from 'indicative/validator'
import { prisma } from '../boot/configs/database'

/**
 * 
 * Extend the indicative validator with a new rule: company_exists.
 * This rule may be used to check if the ID passed for a
 * company is valid and exists in the database.
 * This may be extended in future to support
 * many other models.
 * 
 * 
 */
extend('companyExists', {
    async: true,
    compile(args) {
        return args
    },
    async validate(data, field) {
        const value = getValue(data, field)

        const company = await prisma.company.findFirst({
            where: {
                id: value
            }
        })

        if (company) {
            return true
        }

        return false
    }
})
