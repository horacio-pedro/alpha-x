const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireDir = require('require-dir')
requireDir("../models")

router.get('/', (req, res) => {
    res.render("pages/dashboard/index",
    {
        title: 'Alpha X || Dashboard',
        systemDescription: 'Descrição do sistem aqui',
        favicon: ['light.png'],
        css: ['bootstrap.min.css', 'main.css'],
        classCss: ['authentication'],
        js: ['bootstrap.bundle.min.js']
    })
})

module.exports = router