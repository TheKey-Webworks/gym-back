const { decodeToken } = require("../../../config/jsonwebtoken")
const logger = require("../../../config/winston")

async function loginStatusController({ token }) {

    const result = { isAuthenticated: false, errorCode: 400, message: "Error en la operación", data: [] }

    try {

        const { success, message, data, errorCode } = await decodeToken(token, "userToken")
        result.isAuthenticated = success
        result.message = message
        result.data = data
        result.errorCode = errorCode

    } catch (error) {
        logger.error("Se produjo un error al validar un token en login status controller")
        console.error(error)

        result.errorCode = 500
        result.message = "Se produjo un error al validar la sesión"
        result.isAuthenticated = false
    }

    return result
}



module.exports = {
    loginStatusController
}