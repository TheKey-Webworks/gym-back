const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const routesPath = path.join(__dirname, "platform");

fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".platform_route.js")) { // Buscar archivos con el sufijo correcto
        const filePath = path.join(routesPath, file);
        const route = require(filePath);

        if (route && typeof route === "function") { // Asegurar que es un Router
            const routeName = file.replace(/\.platform_route\.js$/, ""); // Extraer solo el nombre antes del sufijo
            router.use(`/${routeName}`, route);
        }
    }
});

module.exports = router;
