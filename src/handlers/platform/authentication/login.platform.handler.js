const { generateToken } = require("../../../config/jsonwebtoken");
const logger = require("../../../config/winston")
const { loginPlatformController } = require("../../../controllers/platform/authentication/login.platform.controller")

async function loginPlatformHandler(req, res, next) {
    try {

        //obtener solo los datos que vamos a usar por si acaso
        const userData = { username: req.body.username, password: req.body.password };

        //realizar logeo
        const { success, message, data, errorCode } = await loginPlatformController(userData);

        let token = null;
        if (!!data) {
            token = generateToken(data, "1w")
        }

        //dar respuesta 
        return res.status(success ? 200 : errorCode).cookie('platform_auth', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Solo en HTTPS (en producción)
            maxAge: 3600000,      // Tiempo de expiración (1 hora, por ejemplo)
            sameSite: 'Strict',   // Previene el envío de cookies en solicitudes cross-site
        }).json({
            success,
            message,
        })

    } catch (error) {
        logger.error("Se produjo un error en loginPlatformHandler")
        console.log(error)
        return res.status(500).json({
            message: "Se produjo un error en el servidor"
        })
    }
}

module.exports = {
    loginPlatformHandler
}