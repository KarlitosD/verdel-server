import jwt from "jsonwebtoken"
import cuid from "cuid"
import bcrypt from "bcrypt"
import { omit } from "rambda"
import createError from "http-errors"
import { query } from "../db/db.js"

export const loginController = async (req, res, next) => {
	try {
		const { password: passwordRaw, ...restBody } = req.body
		const emailExists = (await query("SELECT id FROM Users WHERE email = ?", req.body.email))[0]
		if (emailExists) throw createError(401, "El email ya existe")

		const passwordHash = await bcrypt.hash(passwordRaw, 10)

		const newUser = {
			id: cuid(),
			...restBody,
			password: passwordHash,
			locate: "Buenos Aires",
			calification: 0
		}
		await query("INSERT INTO Users SET ?", newUser)

		const userToToken = omit(["password"], newUser)
		const token = jwt.sign(userToToken, process.env.TOKEN_SECRET, { expiresIn: "15d" })

		res.send({ ...userToToken, token })
	} catch (error) {
		next(error)
	}
}

export const registerController = async (req, res, next) => {
	try {
		const { password: passwordRaw, email } = req.body
		const user = (await query("SELECT * FROM Users WHERE email = ? LIMIT 1", email))[0]
		if (!user) throw createError(401, "Usuario no existe")

		const matchPassword = await bcrypt.compare(passwordRaw, user.password)
		if (!matchPassword) throw createError(401, "Contraseña incorrecta")

		const userToToken = omit(["password"], user)
		const token = jwt.sign(userToToken, process.env.TOKEN_SECRET, { expiresIn: "15d" })

		res.send({ ...userToToken, token })
	} catch (error) {
		next(error)
	}
}
