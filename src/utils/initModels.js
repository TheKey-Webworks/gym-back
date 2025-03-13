const { sequelize } = require("../config/sequelize");
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

    // relaciones

    // PlatformUserRole
    Platform.hasMany(PlatformUser, { foreignKey: "platformId" })
    PlatformUser.belongsTo(Platform, { foreignKey: "platformId" })
    PlatformUser.hasOne(PlatformUserRole, { foreignKey: "platformUserId" })
    PlatformUserRole.belongsToMany(PlatformUser, { foreignKey: "platformUserId", through: "p_u_r" })
    Platform.hasMany(PlatformJWTBlacklist, { foreignKey: "platformId" })

    sequelize.models = {
        Platform,
        PlatformUser,
        PlatformUserRole,
        PlatformJWTBlacklist
    }
    
    console.log("Modelos inicializados")
}

module.exports = {
    initModels
}