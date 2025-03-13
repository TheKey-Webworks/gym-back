const { Model, DataTypes, UUIDV4 } = require("sequelize")

class PlatformUser extends Model { }

function initPlatformUser(sequelize) {
    PlatformUser.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "PlatformUser"
    })

    return PlatformUser
}

module.exports = {
    initPlatformUser
}