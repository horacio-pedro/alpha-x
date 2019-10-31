module.exports = {
    accessControl: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg", "Acesso negado, efetue o login");
        res.redirect("/");
    },

    isAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.accessLevel == 1){
            return next();
        }
        req.flash("error_msg", "Acesso negado! Contacte o Admnistrador.");
        res.redirect("/dashboard");
    }
};