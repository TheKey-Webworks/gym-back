const { loginStatusController } = require("../../../controllers/platform/authentication/loginStatus.platform.controller");

async function getLoginStatusPlatformHandler(req, res, next) {
    try {

        const token = req?.cookies?.platform_auth

        if (!token) {
            return res.status(401).json({
                isAuthenticated: false,
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