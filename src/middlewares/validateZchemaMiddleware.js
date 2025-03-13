const logger = require("../config/winston");
const { parseSchema, platformUserLoginZSchema } = require("../utils/zod");

function mwValidateZSchema(req, res, next) {

    const validSchemas = {
        platformUserLoginZSchema
    }

    try {
        let selectedSchema;
        const splitURL = req.originalUrl.split("/").join("_")


        switch (splitURL) {
            case "_platform_authentication_login":
                selectedSchema = validSchemas.platformUserLoginZSchema;
                break
            default:
                logger.error(`Se proporcionó un schema inválido (${splitURL})`)
                return res.json("El schema seleccionado no es válido")
        }

        let result = parseSchema(selectedSchema, req.body)

        if (result.success == false) {
            return res.json(result)
        } else {
            result = null
            return next()
        }


    } catch (error) {
        logger.error("Se produjo un error en mwValidateSZchema")
        console.log(error)
        process.exit(1)
    }

}

module.exports = {
    mwValidateZSchema
}