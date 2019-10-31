// LOADING MODULES
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const path = require('path');
    const requireDir = require('require-dir');
    const session = require('express-session');
    const flash = require('connect-flash');
    const passport = require('passport');
    require('./config/auth')(passport);
// END LOADING MODULES

const server = express();
server.use(express.json());

// CONFIGURATIONS
    // Session
        server.use(session({
            secret: "SystemSecurity#2019",
            resave: true,
            saveUninitialized: true
        }));
        server.use(passport.initialize());
        server.use(passport.session());
        server.use(flash());
    // End Session
    // MidleWare
       server.use((req, res, next) => {

            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.info_msg = req.flash("info_msg");
            res.locals.error = req.flash("error");
            res.locals.user = req.user || null;
            next();

        });
    // End MidleWare
    // Body Parser
        server.use(bodyParser.urlencoded({extended: true}));
        server.use(bodyParser.json());
    // EndBody Parser
    // Handlebars
        server.engine('handlebars', handlebars({defaultLayout: 'main'}));
        server.set('view engine', 'handlebars');
    // End Handlebars
    // DataBase: Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://localhost/alpha-x", { useNewUrlParser: true }).then(() => {
            console.log("DataBase Connected")
        }).catch((err) => {
            console.log("Erro ao se conectar: "+err)
        });
    // End DataBase: Mongoose
    // Public Path
        server.use(express.static(path.join(__dirname, "public")))
        server.use((req, res, next) => {
            console.log("MidleWare ON")
            next()
        });
    // End Public Path
    // Routes
        const login = require('./routes/login');
        const dashboard = require('./routes/dashboard');
        const equipment = require('./routes/equipment');
        const document = require('./routes/document');
        const apps = require('./routes/apps');
        const report = require('./routes/report');
        const settingUp = require('./routes/settingUp');
        const department = require('./routes/department');
        server.get('/', function(req, res){
            res.redirect("login");
        });
        server.use('/login', login);
        server.use('/dashboard', dashboard);
        server.use('/equipamento', equipment);
        server.use('/documento', document);
        server.use('/apps', apps);
        server.use('/relatorio', report);
        server.use('/definicoes', settingUp);
        server.use('/departamento', department);
    // End Routes
// END CONFIGURATIONS

// SERVER
    const PORT = 5555
    server.listen(PORT, function(){
        console.log("Server ON")
    });
// END SERVER