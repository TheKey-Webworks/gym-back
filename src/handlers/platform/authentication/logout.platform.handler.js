const { logoutPlatformController } = require("../../../controllers/platform/authentication/logout.platform.controller");

async function logoutPlatformHandler(req, res, next) {
    try {
        const headers = req.headers;
        const splitAuthorization = headers?.authorization?.split("platform_auth ")
        const token =
            splitAuthorization && splitAuthorization[1] ?
                splitAuthorization[1]
                :
                null

        if (!token) {
            return res.status(401).json({
                message: "Inicia sesión para continuar"
            })
        }

        const { success, message, errorCode } = await logoutPlatformController({ token })

        return res.status(errorCode ? errorCode : 200).json({
            success,
            message
        })

    } catch (error) {
        logger.error("Se produjo un error en logoutPlatformHandler")
        console.log(error)
        return res.status(500).json({
            message: "Se produjo un error en el servidor"
        })
    }
}

module.exports = {
    logoutPlatformHandler
}