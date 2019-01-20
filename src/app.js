//导包
const express = require("express")

//穿件APP  服务器
const app = express();


app.get('/',(req,res) => {
    res.send('hello world')
})

app.listen(8081,'127.0.0.1',err => {
    if(err){console.log(err)}
    console.log('start OK!')
})