const { getGymsCountController } = require("../../../controllers/platform/gym-manager/gym-manager/get-all-gyms.platform.controller")

async function getAllGymPlatformHandler(params) {
    try {

    } catch (error) {

    }
}


async function getGymsCountHandler(req, res) {
    try {
        const { page } = req.query
        const { errorCode, message, data, success } = await getGymsCountController({ page })

        return res.status(!success ? errorCode : 200).json({ message, data })

    } catch (error) {

        logger.error("Se produjo un error en get gyms count controller")
        console.error(error)

        return res.status(500).json({
            message: "Se produjo un error en el servidor"
        })
    }
}

module.exports = {
    getAllGymPlatformHandler, getGymsCountHandler
}