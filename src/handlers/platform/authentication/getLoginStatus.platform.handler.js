const { loginStatusController } = require("../../../controllers/platform/authentication/loginStatus.platform.controller");

async function getLoginStatusPlatformHandler(req, res, next) {
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

        const { isAuthenticated, errorCode, message, data } = await loginStatusController({ token })

        return res.status(errorCode ? errorCode : 200).json({
            isAuthenticated,
            message,
            data
        })

    } catch (error) {
        logger.error("Se produjo un error en getLoginStatusPlatformHandler")
        console.log(error)
        return res.status(500).json({
            message: "Se produjo un error en el servidor"
        })
    }
}

module.exports = {
    getLoginStatusPlatformHandler
}