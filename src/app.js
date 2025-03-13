const express = require("express")
const morgan = require("morgan")
const router = require("./routes/router")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

module.exports = {
    app
}