import mysql from "mysql"
import { promisify } from "util"

const pool = mysql.createPool({
	connectionLimit: 100,
	host: "localhost",
	user: "root",
	password: "usbw",
	database: "berdel",
	port: 3307
})

export const query = promisify(pool.query).bind(pool)

export const initDatabase = callback => {
	pool.query(`CREATE TABLE IF NOT EXISTS Users (
    	id int PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(100),
		email VARCHAR(100),
		password VARCHAR(200),
		locate VARCHAR(50),
		calification INT
	)`, (error) => {
		if (error) throw error
		callback()
	})
}
