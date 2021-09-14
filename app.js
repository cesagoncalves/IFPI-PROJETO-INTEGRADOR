const pool = require("./db")
const express = require("express")
const app = express();
const session = require("express-session")
const multer = require("multer")
const moment = require("moment")
const uuid = require("uuid").v4
const pgSession = require("connect-pg-simple")(session)
const router = require("./router")



let sessionOptions = session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: "daedaedd",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
})

app.use(sessionOptions)

app.use(function(req, res, next) {
    res.locals.user = req.session.user
    next()
})

const expressEjsLayouts = require('express-ejs-layouts')

app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")
app.use(expressEjsLayouts)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', router)


app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`)
})