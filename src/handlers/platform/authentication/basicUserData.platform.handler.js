const { getBasicUserDataController } = require("../../../controllers/platform/authentication/basicUserData.platform.controller")

async function getUserBasicData(req, res) {
    try {
        const token = req?.cookies?.platform_auth
        const { message, data, errorCode } = await getBasicUserDataController(token)

        return res.status(errorCode || 200).json({
            message,
            ...data
        })

    } catch (error) {

    }
}

module.exports = {
    getUserBasicData
}