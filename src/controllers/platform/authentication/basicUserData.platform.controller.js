const { decodeToken } = require("../../../config/jsonwebtoken")
const { models } = require("../../../config/sequelize")
const logger = require("../../../config/winston")

async function getBasicUserDataController(token) {
    const result = { message: "Error en la operacion", data: {}, errorCode: 400 }
    try {

        const queryResult = await query(token)

        result.message = queryResult.message
        result.data = queryResult.data
        result.errorCode = queryResult.errorCode

    } catch (error) {
        logger.error("Se produjo un error en getBasicUserDataController")
        console.error(error)
        result.message = "Se produjo un error al obtener los datos del usuario"
        errorCode = 500
    }
    return result
}

async function query(token) {

    const { PlatformUser, PlatformUserRole } = models;

    const queryResult = { message: "Error en la operacion", data: {}, errorCode: 400 }

    try {
        const { success, data, errorCode } = (await decodeToken(token))

        if (!success) {
            queryResult.errorCode = errorCode
            queryResult.message = "Token inválido"
        }


        console.log(data)
        const { id } = data;

        const user = await PlatformUser.findOne({
            where: {
                id
            },
            include: { model: PlatformUserRole }
        });

        if (!user) {
            console.log("El usuario no existe");
            queryResult.message = "Usuario no encontrado";
            queryResult.errorCode = 404;
        } else {

            queryResult.errorCode = null
            queryResult.message = "Operación exitosa";
            queryResult.data = {
                id: user?.id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email,
                role: user?.PlatformUserRole?.role
            };
        }

    } catch (error) {
        console.error(error)
        logger.error("Se produjo un error en la funcion query (login platform controller)");
        throw new Error(error);
    }

    return queryResult
}

module.exports = { getBasicUserDataController }