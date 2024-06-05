const express = require("express")
const session = require("express-session")

const authentification = require("./controller/authController.js")
const accountManagement = require("./controller/accController.js")

const app = express()
const port = 9000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.use("", authentification)
app.use("", accountManagement)

app.listen(port, () => {
    console.log("Bfriend is running on port:", port)
})

