export default (err, req, res, next) => {
	return res.status(err.status || 500).send({
		error: true,
		message: err.message || "Error en el servidor"
	})
}
