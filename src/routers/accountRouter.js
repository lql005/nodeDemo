
const express = require("express");





const accountRouter = express.Router();

const path = require('path')

const accountController = require(path.join(__dirname,'../controllers/accountController.js'))

accountRouter.get('/register',accountController.getRegisterPage)
accountRouter.get('/register',accountController.getLoginPage)
accountRouter.post('/register',accountController.getRegisterData)
accountRouter.post('/login',accountController.doLogin)
accountRouter.get('/vcode',accountController.getVcode)

module.exports = {
    accountRouter
}