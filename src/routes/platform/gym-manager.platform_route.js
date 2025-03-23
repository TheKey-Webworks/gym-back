const { Router } = require("express");
const { isAuthenticated } = require("../../middlewares/isAuthenticatedMiddleware");
const { createGymPlatformHandler } = require("../../handlers/platform/gym-manager/create-gym.platform.handler");
const { mwValidateZSchema } = require("../../middlewares/validateZchemaMiddleware");

const router = Router()

router.use(isAuthenticated)

//create gym
router.post("/create-gym", mwValidateZSchema, createGymPlatformHandler)


module.exports = router