const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const routesPath = path.join(__dirname, "platform");

fs.readdirSync(routesPath).forEach((file) => {
    console.log(file);

    if (file.endsWith(".platform_route.js")) {
        const filePath = path.join(routesPath, file);
        const route = require(filePath);

        if (route && typeof route === "function") {
            const routeName = file.replace(/\.platform_route\.js$/, "");
            router.use(`/${routeName}`, route);
        }
    }
});

module.exports = router;
