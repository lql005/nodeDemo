
const express = require("express");

const accountRouter = express.Router();

const path = require('path')

const accountController = require(path.join(__dirname,'../controllers/accountController.js'))

accountRouter.get('/register',accountController.getRegisterPage)

module.exports = {
    accountRouter
}