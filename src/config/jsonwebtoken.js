const jwt = require("jsonwebtoken")
const logger = require("./winston")
const { config } = require("dotenv")
const { models } = require("./sequelize")

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

async function decodeToken(data, type = "common") {
    const { PlatformJWTBlacklist, PlatformUser } = models

    try {

        const blacklisted = await PlatformJWTBlacklist.findOne({
            where: {
                token: data
            },
        })

        if (blacklisted) {
            throw new jwt.TokenExpiredError()
        }



        const decoded = jwt.verify(data, JWT_SECRET);

        const id = decoded.id

        const user = await PlatformUser.count({ where: { id } })

        if (!user) {
            await PlatformJWTBlacklist.findOrCreate({ where: { token: data }, defaults: { token: data } })
            return { success: false, data: {}, errorCode: 404, message: "El usuario no existe" }
        }

        return { success: true, data: { ...decoded }, errorCode: null, message: "Operacion exitosa" }

    } catch (error) {

        console.log(error.message);
        console.log(error);

        if (error instanceof jwt.TokenExpiredError) {

            await PlatformJWTBlacklist.findOrCreate({
                where: {
                    token: data
                },
                defaults: {
                    token: data
                }
            })


            return {
                success: false,
                message: "El token ha expirado",
                errorCode: 401,
            };
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return {
                success: false,
                message: "Token inválido",
                errorCode: 400,
            };
        }

        return {
            success: false,
            message: "Error desconocido al validar el token.",
            errorCode: 500,
        };
    }
}

module.exports = {
    generateToken,
    decodeToken
}