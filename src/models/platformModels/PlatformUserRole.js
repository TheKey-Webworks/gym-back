const { Model, DataTypes } = require("sequelize");

class PlatformUserRole extends Model { }

function initPlatformUserRole(sequelize) {
    PlatformUserRole.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["owner", "admin", "operator"]]
            }
        }
    }, {
        sequelize,
        modelName: "PlatformUserRole"
    })
    return PlatformUserRole
}

module.exports = {
    initPlatformUserRole

}