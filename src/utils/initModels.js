const { sequelize } = require("../config/sequelize");
const { initGym } = require("../models/commonModels/Gym");
const { initGymUser } = require("../models/Gym/GymUser");
const { initPlatform } = require("../models/platformModels/Platform");
const { initPlatformJWTBlacklist } = require("../models/platformModels/PlatformJWTBlackist");
const { initPlatformUser } = require("../models/platformModels/PlatformUser");
const { initPlatformUserRole } = require("../models/platformModels/PlatformUserRole");


function initModels() {

    // modelos
    const Platform = initPlatform(sequelize)
    const PlatformUser = initPlatformUser(sequelize)
    const PlatformUserRole = initPlatformUserRole(sequelize)
    const PlatformJWTBlacklist = initPlatformJWTBlacklist(sequelize)
    const GymUser = initGymUser(sequelize)
    const Gym = initGym(sequelize)

    // relaciones

    // PlatformUserRole
    Platform.hasMany(PlatformUser, { foreignKey: "platformId" })
    PlatformUser.belongsTo(Platform, { foreignKey: "platformId" })
    PlatformUser.hasOne(PlatformUserRole, { foreignKey: "platformUserId" })
    PlatformUserRole.belongsToMany(PlatformUser, { foreignKey: "platformUserId", through: "p_u_r" })
    Platform.hasMany(PlatformJWTBlacklist, { foreignKey: "platformId" })

    //common relations

    Platform.hasMany(Gym)
    Gym.belongsTo(Platform, { foreignKey: "platformId" })

    Platform.hasMany(GymUser)
    GymUser.belongsTo(Platform, { foreignKey: "platformId" })

    GymUser.hasMany(Gym)
    Gym.belongsTo(GymUser, { foreignKey: "gymUserId" })

    sequelize.models = {
        Platform,
        PlatformUser,
        PlatformUserRole,
        PlatformJWTBlacklist,
        GymUser,
        Gym
    }

    console.log("Modelos inicializados")
}

module.exports = {
    initModels
}