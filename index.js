const { config } = require("dotenv")
const { app } = require("./src/app")
const { sequelize } = require("./src/config/sequelize")
const { initModels } = require("./src/utils/initModels")
const logger = require("./src/config/winston")
const { setupPlatform } = require("./src/utils/setupPlatform")
const { generateTestUserGym } = require("./src/utils/db_test_initializers/generateTestUser")


// dotenv config
config({
    path: "./.env"
})


// server start

async function startServer() {
    try {

        initModels()


        //autenticar y sincronizar la db
        await sequelize.authenticate()
        logger.info("Database connected")

        await sequelize.sync({ force: false })
        logger.info("Database synced")


        await setupPlatform(sequelize.models)
        logger.info("Platform setup")

        // ["DEBUG"]
        await generateTestUserGym()

        // iniciar server
        app.listen(3000, () => {
            logger.info("Server running on port 3000")
            console.log("\n %s", sequelize.models)
        })

    } catch (error) {
        console.error(error)
        logger.error(error)
    }
}


startServer()