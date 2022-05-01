import express, { json } from "express"
import cors from "cors"
import { config } from "dotenv"

import router from "./routes/router.js"
import errorHandler from "./middlewares/errorHandler.js"
import { initDatabase } from "./db/db.js"

config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(json())
app.use(cors())

app.use("/api", router)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log("Server running in port " + PORT)
	initDatabase(() => {
		console.log("Database connected")
	})
})
