const jwt = require("jsonwebtoken")
const logger = require("./winston")
const { config } = require("dotenv")

//dotenv 
config()
const { JWT_SECRET } = process.env

function generateToken(data, expTime) {
    try {
        const token = jwt.sign(data, JWT_SECRET, { expiresIn: expTime || "24hs" })
        if (token) {
            return token
        } else {
            throw new Error("Error while generate jwt token.")
        }
    } catch (error) {
        logger.error("An error has occured in jsonwebtoken.js")
        console.error(error)
        process.exit(1)
    }
}

module.exports = {
    generateToken
}