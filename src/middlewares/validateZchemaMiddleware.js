const logger = require("../config/winston");
const { parseSchema, platformUserLoginZSchema, platformGymCreateZSchema } = require("../utils/zod");

function mwValidateZSchema(req, res, next) {

    const validSchemas = {
        platformUserLoginZSchema,
        platformGymCreateZSchema
    }

    try {
        let selectedSchema;
        const splitURL = req.originalUrl.split("/").join("_")
        console.log(splitURL)

        switch (splitURL) {
            case "_platform_authentication_login":
                selectedSchema = validSchemas.platformUserLoginZSchema;
                break
            case "_platform_gym-manager_create-gym":
                selectedSchema = validSchemas.platformGymCreateZSchema
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