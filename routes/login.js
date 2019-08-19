const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireDir = require('require-dir')
requireDir("../models")

router.get('/', (req, res) => {
    res.render("pages/login/index")
})

module.exports = router