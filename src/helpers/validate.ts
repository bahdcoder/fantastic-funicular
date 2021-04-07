import { sanitize } from 'indicative/sanitizer'
import { validateAll } from 'indicative/validator'

// Invoke custom validation rules 
import './custom-rules'

/**
 * Validate data using a schema of validation rules. If validation passes,
 * a tuple with true and validated data is returned.
 *
 * If validation fails, the tuple contains false and a list of all validation
 * rules.
 *
 * @param data any
 * @param schema schema of data validation rules
 *
 * @returns [boolean, object]
 */
export const validate = async (
    data: any,
    schema: { [field: string]: string },
    sanitizationSchema: { [field: string]: string }
) => {
    try {
        sanitize(data, sanitizationSchema)

        const payload = await validateAll(data, schema)

        return [true, payload]
    } catch (errors) {
        return [false, errors]
    }
}
