const { models } = require("../../../config/sequelize")
const logger = require("../../../config/winston")


async function logoutPlatformController({ token }) {
    const result = { success: false, message: "Error en la operación", errorCode: 400 }

    try {

        const queryResult = await query(token)
        result.success = queryResult.success
        result.message = queryResult.message
        result.errorCode = queryResult.errorCode

    } catch (error) {
        logger.error("Se produjo un error en logout platform controller")

        console.error(error)

        result.success = false
        result.message = "Se produjo un error al cerrar sesión"
        result.errorCode = 500
    }
    return result
}

async function query(token) {
    const { PlatformJWTBlacklist } = models

    const queryResult = { success: false, message: "Se produjo un error al cerrar sesión", errorCode: 500 }
    try {

        const [_, isNew] = await PlatformJWTBlacklist.findOrCreate({
            where: { token },
            defaults: { token }
        })

        if (isNew) {
            queryResult.success = true
            queryResult.errorCode = null
            queryResult.message = "Cerraste sesión"
        } else {
            queryResult.success = false
            queryResult.errorCode = 409
            queryResult.message = "No tenés una sesión activa."
        }

    } catch (error) {
        logger.error("Se produjo un error al cerrar sesion en logout status controller")
        console.error(error)

        queryResult.errorCode = 500
        queryResult.message = "Se produjo un error al cerrar sesión"
        queryResult.success = false
    }
    return queryResult
}

module.exports = { logoutPlatformController }