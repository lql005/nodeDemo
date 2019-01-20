//导包
const express = require("express")


const app = express();

const path = require('path')
const session = require('express-session');
                        
const bodyParser = require('body-parser')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))

app.use(express.static(path.join(__dirname,'static')))

app.get('/',(req,res) => {
    res.send('hello world')
})

app.listen(8081,'127.0.0.1',err => {
    if(err){console.log(err)}
    console.log('start OK!')
})


app.use('/account',accountRouter.accountRouter)