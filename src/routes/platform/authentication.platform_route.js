const { Router } = require("express");
const { mwValidateZSchema } = require("../../middlewares/validateZchemaMiddleware");
const { loginPlatformHandler } = require("../../handlers/platform/authentication/login.platform.handler");
const { getLoginStatusPlatformHandler } = require("../../handlers/platform/authentication/getLoginStatus.platform.handler");
const { logoutPlatformHandler } = require("../../handlers/platform/authentication/logout.platform.handler");
const { isAuthenticated } = require("../../middlewares/isAuthenticatedMiddleware");
const { getUserBasicData } = require("../../handlers/platform/authentication/basicUserData.platform.handler");

const router = Router();

//common routes
router.post("/login", mwValidateZSchema, loginPlatformHandler)
router.get("/logout", logoutPlatformHandler)
router.get("/get_login_status", getLoginStatusPlatformHandler)
router.get("/get_basic_user", isAuthenticated, getUserBasicData)


module.exports = router;