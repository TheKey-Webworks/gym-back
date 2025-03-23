const logger = require("../../../config/winston");
const { allGymUsersBasicDataFetchController } = require("../../../controllers/gym-users-data/gyms-users-data.controller")

async function allGymUsersBasicDataFetchHandler(req, res) {
    try {
        const page = req.query.page || 1;
        const { message, data, errorCode, success } = await allGymUsersBasicDataFetchController({ page })

        return res.status(errorCode || 200).json({
            message, data, success
        })

    } catch (error) {
        logger.error("Se produjo u erorr en allGymUsersBasicDataFetchHandler")
        console.error(error)
        return res.status(500).json({ success: false, message: "Se produjo un error en el servidor.", data: {} })
    }
}

module.exports = {
    allGymUsersBasicDataFetchHandler
}