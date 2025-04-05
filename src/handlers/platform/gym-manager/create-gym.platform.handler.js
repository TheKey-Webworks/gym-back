const logger = require("../../../config/winston")
const { createGymPlatformController } = require("../../../controllers/platform/gym-manager/gym-manager/create-gym.platform.controller")

async function createGymPlatformHandler(req, res) {
    try {
        const { name, branches, gymOwner, fee, discount, discountPeriod } = req.body
        const { data, errorCode, message, success } = await createGymPlatformController({ name, branches, gymOwner, discount, discountPeriod, fee })

        return res.status(!success ? errorCode : 201).json({
            message,
            data,
            success
        })

    } catch (error) {
        logger.error("Se produjo un error en create gym platform handler")
        console.error(error)
        return res.status(500).json("Se produjo un error en el sevidor")
    }

}

module.exports = {
    createGymPlatformHandler
}