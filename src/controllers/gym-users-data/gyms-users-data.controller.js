const { models } = require("../../config/sequelize")
const logger = require("../../config/winston")

async function allGymUsersBasicDataFetchController({ page }) {
    const result = { message: "Error en la operación", data: {}, errorCode: 400, success: false }
    try {

        const queryResult = await queryFetchAllBasicData({ page })

        result.message = queryResult.message
        result.data = queryResult.data
        result.errorCode = null
        result.success = queryResult.success

    } catch (error) {
        logger.error("Se produjo un erro en gymUsersBasicDataFetchController")
        console.error(error)
        result.success = false
        result.message = "Se produjo un error en el servidor"
        result.errorCode = 500
        result.data = {}
    }

    return result
}

async function queryFetchAllBasicData({ page }) {
    const { GymUser } = models;
    const queryResult = { message: "Se produjo un error en la operación", data: [], errorCode: 400, success: false };

    try {
        const pageNumber = page && page > 0 ? page : 1;
        const limit = 30;
        const offset = (pageNumber - 1) * limit;

        const allUsers = await GymUser.findAll({
            limit: limit,
            offset: offset,
            attributes: ["id", "firstName", "lastName", "email", "profilePicture"]
        });

        queryResult.success = true;
        queryResult.message = "Usuarios obtenidos con éxito";
        queryResult.data = allUsers;
    } catch (error) {
        queryResult.success = false;
        queryResult.message = "Se produjo un error al obtener los usuarios";
        queryResult.errorCode = 500;
    }
    return queryResult;
}

module.exports = {
    allGymUsersBasicDataFetchController
}