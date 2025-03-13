const { Router } = require("express");
const { mwValidateZSchema } = require("../../middlewares/validateZchemaMiddleware");
const { loginPlatformHandler } = require("../../handlers/platform/authentication/login.platform.handler");

const router = Router();

router.post("/login", mwValidateZSchema, loginPlatformHandler)

module.exports = router;