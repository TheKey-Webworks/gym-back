const { number } = require("zod")
const { models } = require("../../../../config/sequelize")
const logger = require("../../../../config/winston")

async function getGymsCountController() {
    const result = { errorCode: 400, message: "Error en la solicitud", data: { count: 0 }, success: false }
    try {
        const { Gym } = models
        const gymsCount = await Gym.count()


        console.log(typeof gymsCount)

        if (!gymsCount && typeof gymsCount !== "number") {
            result.message = "Se produjo un error al obtener el número de gimnasios registrados"
            result.errorCode = 500
            result.success = false
        } else {
            result.success = true
            result.data.count = gymsCount
            result.message = "Operación exitosa"
        }

    } catch (error) {
        result.errorCode = 500
        result.message = "Se produjo un error al obtener la lista de usuarios"
        result.success = false
    }

    return result
}

module.exports = {
    getGymsCountController
}