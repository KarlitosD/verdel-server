import jwt from "jsonwebtoken"

const authToken = (req, res, next) => {
	const header = req.header("Authorization")
	if (!header) return res.status(401).json({ error: "Acceso denegado" })
	const token = header.split(" ")[1]
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		req.user = verified
		next()
	} catch (error) {
		res.status(400).json({ error: "token no es válido" })
	}
}
export default authToken
