const { createGymPlatformController } = require("../../../controllers/platform/gym-manager/gym-manager/create-gym.platform.controller")

async function createGymPlatformHandler(req, res) {
    try {
        const { name, branches, gymOwner, fee, discount, discountPeriod } = req.body

        const {message, errorCode, data } = await createGymPlatformController()

    } catch (error) {

    }

}

module.exports = {
    createGymPlatformHandler
}