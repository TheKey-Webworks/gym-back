const logger = require("../../../config/winston")
const { loginPlatformController } = require("../../../controllers/platform/authentication/login.platform.controller")

async function loginPlatformHandler(req, res, next) {
    try {

        //obtener solo los datos que vamos a usar por si acaso
        const userData = { username: req.body.username, password: req.body.password };

        //realizar logeo
        const { success, message, data, errorCode } = await loginPlatformController(userData);

        //dar respuesta 
        return res.status(success ? 200 : errorCode).json({
            success,
            message,
            data
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