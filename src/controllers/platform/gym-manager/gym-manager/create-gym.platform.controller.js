const { sequelize, models, transaction } = require("../../../../config/sequelize")
const logger = require("../../../../config/winston")



async function createGymPlatformController({ name, branches, gymOwner, fee, discount, discountPeriod }) {
    const result = { data: {}, errorCode: 400, message: "Se produjo un error en la solicitud", success: false }


    try {

        const queryResult = await query({ name, branches, gymOwner, fee, discount, discountPeriod })

        result.data = queryResult.data
        result.errorCode = queryResult.errorCode
        result.message = queryResult.message
        result.success = queryResult.success

    } catch (error) {
        logger.error("Se produjo un error en create gym platform controller")
        console.error(error)

        result.errorCode = 400
        result.message = "Se produjo un error al añadir el gimnasio."
    }

    return result
}

async function query({ name, branches, gymOwner: gymOwnerId, fee, discount, discountPeriod }) {

    const queryResult = { data: {}, errorCode: 400, message: "Se produjo un error en la solicitud", success: false }
    const queryTransaction = await sequelize.transaction()
    try {
        const { Gym, GymUser } = models

        const [__gym, isNew] = await Gym.findOrCreate({
            where: { gymOwner: gymOwnerId, name },
            defaults: {
                name,
                branches,
                gymOwner: gymOwnerId,
                fee,
                discount,
                discountPeriod
            },
            transaction: queryTransaction
        })

        if (!isNew) {
            queryResult.message = "El gimnasio ya existe"
            queryResult.errorCode = 409
            queryTransaction.rollback()
        } else {
            const cgUser = await GymUser.findOne({
                where: {
                    id: gymOwnerId
                },
                transaction: queryTransaction
            })

            if (!cgUser) {
                queryTransaction.rollback()
                queryResult.message = "El usuario especificado no existe. (404)"
                queryResult.errorCode = 404
                return queryResult
            }

            await __gym.setGymUser(cgUser, { transaction: queryTransaction })


            queryResult.message = "Gimnasio añadido correctamente"
            queryResult.success = true

        }


    } catch (error) {
        queryResult.message = "Se produjo un error al registrar el gimnasio"
        queryResult.errorCode = 500
        transaction.rollback()
    }

    return queryResult

}





module.exports = {
    createGymPlatformController
}