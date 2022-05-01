import { object, string } from "superstruct"

export const RegisterSchema = object({
	name: string(),
	email: string(),
	password: string()
	// location: string()
})

export const LoginSchema = object({
	email: string(),
	password: string()
	// location: string()
})
