const { Model, DataTypes, UUIDV4 } = require("sequelize");

class Gym extends Model { }

function initGym(sequelize) {
    Gym.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El nombre del gimnasio es obligatorio"
                }
            }
        },
        branches: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "El número de sucursales debe ser un número entero"
                },
                min: {
                    args: [1],
                    msg: "El número de sucursales debe ser al menos 1"
                }
            }
        },
        gymOwner: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El propietario del gimnasio es obligatorio"
                }
            }
        },
        fee: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: "La cuota debe ser mayor o igual a 0"
                }
            }
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: {
                    args: [0],
                    msg: "El descuento debe ser mayor o igual a 0"
                }
            }
        },
        discountPeriod: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: "El periodo de descuento debe ser una fecha válida"
                }
            }
        }
    }, {
        sequelize,
        modelName: "Gym"
    });

    return Gym;
}

module.exports = {
    initGym
};
