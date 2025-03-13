const logger = require("../config/winston")
const { loginStatusController } = require("../controllers/platform/authentication/loginStatus.platform.controller")

async function isAuthenticated(req, res, next) {
    try {
        const token = req?.cookies?.platform_auth

        if (!token) {
            return res.status(401).json({
                isAuthenticated: false,
                message: "Inicia sesión para continuar"
            })
        }

        const { isAuthenticated, data } = await loginStatusController({ token })

        if (!isAuthenticated) {
            return res.status(401).json({ message: "Inicia sesión para continuar", data })
        }

        if (isAuthenticated) {
            return next()
        }

    } catch (error) {
        logger.error("Se produjo un error en el middleware isAuthenticated")
        console.error(error)
        return res.status(500).json({
            message: "Se produjo un error en el servidor."
        })
    }
}

module.exports = {
    isAuthenticated
}