const { Op } = require("sequelize");
const { models } = require("../../../config/sequelize");
const logger = require("../../../config/winston");
const bcrypt = require("bcrypt");

async function loginPlatformController({ username, password }) {
    // Para que no falte nada en el handler
    const result = { success: false, message: "Error en la operacion", data: {}, errorCode: 400 };

    try {
        const resultData = await query(username, password);
        console.log(resultData, "-----");

        result.success = resultData.success;
        result.message = resultData.message;
        result.data = resultData.data;
        result.errorCode = resultData.errorCode;

    } catch (error) {
        logger.error("Se produjo un error en login platform controller");
        console.log(error);

        result.message = "Se produjo un error al iniciar sesión";
        result.errorCode = 500;
        result.success = false;
    }

    return result;
}

async function query(username, password) {
    const queryResult = { success: false, message: "Error en la operacion", data: {}, errorCode: 400 };

    try {
        const { PlatformUser, PlatformUserRole } = models;
        // Obtener el usuario
        const user = await PlatformUser.findOne({
            where: {
                email: username // actualizar cuando se agregue el campo de username
            },
            include: { model: PlatformUserRole }
        });

        if (!user) {
            console.log("El usuario no existe");
            queryResult.success = false;
            queryResult.message = "Usuario no encontrado";
            queryResult.errorCode = 404;
        } else {
            console.log("El usuario existe, comprobar contraseña");

            // Usamos bcrypt.compare con await para esperar su resultado
            const passMatch = await bcrypt.compare(password, user?.password);

            if (!passMatch) {
                console.log("La contraseña no coincide");
                queryResult.success = false;
                queryResult.message = "Contraseña incorrecta";
                queryResult.errorCode = 401;
            } else {
                console.log("La contraseña coincide");

                queryResult.success = true;
                queryResult.message = "Inicio de sesión exitoso";
                queryResult.data = {
                    id: user?.id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    role: user?.PlatformUserRole?.role
                };
            }
        }
    } catch (error) {
        logger.error("Se produjo un error en la funcion query (login platform controller)");
        throw new Error(error);
    }

    return queryResult;
}

module.exports = {
    loginPlatformController
};
