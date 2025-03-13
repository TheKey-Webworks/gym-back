const { Model, DataTypes } = require("sequelize");

class PlatformJWTBlacklist extends Model { }

function initPlatformJWTBlacklist(sequelize) {
    PlatformJWTBlacklist.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },

        token: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: "PlatformJWTBlacklist"
    })

    return PlatformJWTBlacklist
}

module.exports = {
    initPlatformJWTBlacklist
}