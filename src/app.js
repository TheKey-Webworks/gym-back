const express = require("express")
const morgan = require("morgan")
const router = require("./routes/router")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

module.exports = {
    app
}