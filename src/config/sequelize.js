const { config } = require("dotenv");
const { Sequelize } = require("sequelize");

//env
config()

const { DB_URL } = process.env

//db

const sequelize = new Sequelize(`${DB_URL}`, {
    dialect: "postgres",
    logging: false
})

const db = sequelize.models

module.exports = {
    sequelize,
    transaction: sequelize.transaction,
    models: db
}