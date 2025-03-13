const { config } = require("dotenv")
const { sequelize, models } = require("../config/sequelize")
const logger = require("../config/winston")

//env
config()

const {
    FIRST_NAME,
    LAST_NAME,
    PASSWORD,
    EMAIL
} = process.env

async function setupPlatform() {
    try {

        // models
        const { Platform, PlatformUser, PlatformUserRole } = models

        // setup de platform
        logger.info("Checking platform setup...")
        const [platform, isNewP] = await Platform.findOrCreate({ where: {}, defaults: {} })


        if (isNewP) {
            logger.info(`Platform created with id: ${platform.id}`);
        }


        // setup de roles

        // owner role
        logger.info("Checking platform owner role setup")
        const [ownerRole, isNewOR] = await PlatformUserRole.findOrCreate({
            where: { role: "owner" },
            defaults: { role: "owner" }
        });

        if (isNewOR) {
            logger.info(`Owner role created with id: ${ownerRole.id}`);
        } else {
            logger.info("Owner role already exists");
        }




        // admin role
        logger.info("Checking platform admin role setup")
        const [adminRole, isNewAR] = await PlatformUserRole.findOrCreate({
            where: { role: "admin" },
            defaults: { role: "admin" }
        });

        if (isNewAR) {
            logger.info(`Admin role created with id: ${adminRole.id}`);
        } else {
            logger.info("Admin role already exists");
        }


        // operator role
        logger.info("Checking platform operator role setup")
        const [operatorRole, isNewOPR] = await PlatformUserRole.findOrCreate({
            where: { role: "operator" },
            defaults: { role: "operator" }
        });

        if (isNewOPR) {
            logger.info(`Operator role created with id: ${operatorRole.id}`);
        } else {
            logger.info("Operator role already exists");
        }


        // setup de owner
        logger.info("Checking platform owner setup")

        const [owner, isNewOwner] = await PlatformUser.findOrCreate({
            where: {
                email: EMAIL
            },
            defaults: {
                firstName: FIRST_NAME,
                lastName: LAST_NAME,
                password: PASSWORD,
                email: EMAIL
            }
        });

        if (isNewOwner) {

            owner.setPlatformUserRole(ownerRole)
            owner.setPlatform(platform)
            

            logger.info(`Owner created with id: ${owner.id}`);
        } else {
            logger.info("Owner already exists");
        }

        logger.info("Platform setup completed")

    } catch (error) {
        logger.error(error.message)
        console.error(error)
        process.exit(1)
    }
}

module.exports = {
    setupPlatform
}