import { assert } from "superstruct"

export default function checkSchema (schema) {
	return ({ body }, _res, next) => {
		try {
			assert(body, schema)
			next()
		} catch (error) {
			next(error)
		}
	}
}
