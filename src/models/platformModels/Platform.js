const { Model, DataTypes, UUIDV4 } = require("sequelize")

class Platform extends Model { }

function initPlatform(sequelize) {
    Platform.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            unique: true
        }
    }, {
        sequelize,
        modelName: "Platform"
    })

    return Platform
}

module.exports = {
    initPlatform
}