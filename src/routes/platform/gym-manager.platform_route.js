const { Router } = require("express");
const { isAuthenticated } = require("../../middlewares/isAuthenticatedMiddleware");
const { createGymPlatformHandler } = require("../../handlers/platform/gym-manager/create-gym.platform.handler");
const { mwValidateZSchema } = require("../../middlewares/validateZchemaMiddleware");
const { getAllGymPlatformHandler, getGymsCountHandler } = require("../../handlers/platform/gym-manager/get-all-gyms.platform.handler");

const router = Router()

router.use(isAuthenticated)

//create gym
router.post("/create-gym", mwValidateZSchema, createGymPlatformHandler)

//getGymCount
router.get("/get-gyms-count", getGymsCountHandler)

//get all gyms 
router.get("/get-gyms", getAllGymPlatformHandler)

module.exports = router