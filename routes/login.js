const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireDir = require('require-dir')
requireDir("../models")
const passport = require('passport');

router.get('/', (req, res) => {
    res.render("pages/login/index",
    {
        title: 'Alpha X || Login',
        systemDescription: 'Descrição do sistem aqui',
        favicon: ['light.png'],
        css: ['bootstrap.min.css', 'main.css'],
        classCss: ['authentication'],
        js: ['bootstrap.bundle.min.js']
    })
})

router.post("/", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)
});

router.get("/sair", (req, res) => {
    req.logout();
    req.flash("success_msg", "Deslogado com sucesso!");
    res.redirect("/");
});

module.exports = router