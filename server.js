// LOADING MODULES
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const mongoose = require('mongoose')
    const path = require('path')
    const requireDir = require('require-dir')
// END LOADING MODULES

const server = express()
server.use(express.json())

// CONFIGURATIONS
    // Session
    // End Session
    // MidleWare
       /* server.use((req, res, next) => {

            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()

        })*/
    // End MidleWare
    // Body Parser
        server.use(bodyParser.urlencoded({extended: true}))
        server.use(bodyParser.json())
    // EndBody Parser
    // Handlebars
        server.engine('handlebars', handlebars({defaultLayout: 'main'}))
        server.set('view engine', 'handlebars')
    // End Handlebars
    // DataBase: Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://localhost/alpha-x", { useNewUrlParser: true }).then(() => {
            console.log("DataBase Connected")
        }).catch((err) => {
            console.log("Erro ao se conectar: "+err)
        })
    // End DataBase: Mongoose
    // Public Path
        server.use(express.static(path.join(__dirname, "public")))
        server.use((req, res, next) => {
            console.log("MidleWare ON")
            next()
        })
    // End Public Path
    // Routes
        const login = require('./routes/login')
        const dashboard = require('./routes/dashboard')
        server.get('/', function(req, res){
            res.redirect("login")
        })
        server.use('/login', login)
        server.use('/dashboard', dashboard)
    // End Routes
// END CONFIGURATIONS

// SERVER
    const PORT = 5555
    server.listen(PORT, function(){
        console.log("Server ON")
    })
// END SERVER