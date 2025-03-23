const { Router } = require("express");
const { allGymUsersBasicDataFetchHandler } = require("../../handlers/platform/gym-users-data/gym-users-data.handler");
const { isAuthenticated } = require("../../middlewares/isAuthenticatedMiddleware");

const router = Router()

//fetch all users basic data 
router.get("/basic-data", isAuthenticated, allGymUsersBasicDataFetchHandler)


module.exports = router