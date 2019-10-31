const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireDir = require('require-dir')
requireDir("../models")
const { accessControl } = require('../config/accessControl');

router.get('/', accessControl, (req, res) => {
    res.render("pages/dashboard/index",
    {
        title: 'Alpha X || Dashboard',
        systemDescription: 'Descrição do sistem aqui',
        favicon: ['light.png'],
        classCss: ['active-page'],
        css: ['stylesheet.bundle.css'],
        js: ['bootstrap.bundle.min.js', 'script.bundle.js']
    })
})

module.exports = router