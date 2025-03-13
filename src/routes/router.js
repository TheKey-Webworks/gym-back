const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const routesPath = __dirname;

fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".router.js")) {
        const filePath = path.join(routesPath, file);
        const route = require(filePath);

        if (route && typeof route === "function") { // Verifica que sea un Router
            const routeName = file.replace(/.router.js$/, ""); // Obtiene el nombre sin extensión
            router.use(`/${routeName}`, route);
        }
    }
});

module.exports = router;
