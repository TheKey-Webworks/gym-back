const { models } = require("../../../../config/sequelize")
const logger = require("../../../../config/winston")

async function createGymPlatformController({ name, branches, gymOwner, fee, discount, discountPeriod }) {

    const result = { message: "Error en la operación", errorCode: 400, data: {}, success: false }

    try {
        const queryResult = await query({ name, branches, gymOwner, fee, discount, discountPeriod })
        result.message = queryResult.message
        result.errorCode = queryResult.errorCode
        result.data = queryResult.data
    } catch (error) {
        logger.error("Se produjo un error en create-gym controller (platform)")
        logger.error(error)
        result.success = false
        result.message = "Se produjo un error en el servidor."
        result.errorCode = 500
    }

    return result

}

async function query({ name, branches, gymOwner, fee, discount, discountPeriod }) {

    const queryResult = { message, errorCode, data }
    const { Gym: GymModel } = models;
    try {
        const [gym, isNew] = await GymModel.findOrCreate({
            where: {
                name: name,
            }
        })
    } catch (error) {

    }

    return queryResult

}

module.exports = {
    createGymPlatformController
}