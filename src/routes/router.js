import { Router } from "express"
import authRoutes from "./auth.routes.js"
import authToken from "../middlewares/authToken.js"
const router = Router()

router.use("/auth", authRoutes)
router.get("/", authToken, (req, res) => {
	res.send("Funciona el token")
})
export default router
