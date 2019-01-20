// exports.getRegisterPage = (req,res) => {
//     console.log('这是注册页面');   
// }
const MongoClient = require('mongodb').MongoClient
//第三步:与mongodb建立连接,此处是node与mongo的连接
//3.1:获取mongodb的地址
const url = 'mongodb://localhost:27017';
//导入生成验证码的的包
const captchapng = require('captchapng');
//

//3.2:获取要连接的数据库名称
const dbName = "szhmqd27";

const path = require('path')
const getRegisterPage =  (req,res) => {
    res.sendFile(path.join(__dirname,'../static/views/register.html')) 
}
const getLoginPage =  (req,res) => {
    res.sendFile(path.join(__dirname,'../static/views/login.html')) 
}
const getVcode = (req,res) => {
    const Vcode = parseInt(Math.random()*9000+1000)
    
    req.session.vcode = Vcode
    var p = new captchapng(80,30,Vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

const doLogin = (req,res) => {
    const result3 = {
        status:0,
        msg:'登录成功'
    }
    const vcode = req.session.vcode
    const {userName,passWord,vcodeId} = req.body
    if(vcodeId!=vcode){
        result3.status=1
        result3.msg = '验证码错误'
        res.json(result3)
    }else{
        MongoClient.connect (url,{useNewUrlParser:true},function (err,client) {
            const db = client.db(dbName)
            const collection = db.collection('registerData')
            collection.findOne({userName},(err,docs) => {
                if(docs&&userName==docs.userName&&passWord==docs.passWord){
                    res.json(result3)
                    client.close()
                }else if(!docs){
                    result3.status=3
                    result3.msg = '账号未注册'
                    res.json(result3)
                    client.close()
                }else{
                    result3.status=2
                    result3.msg = '账户或密码错误'
                    res.json(result3)
                    client.close()
                }             
            })
        })
    }
}

const getRegisterData = (req,res) => {
    const result = {
        status:0,
        msg:'注册成功'
    }
    const {userName} = req.body
    MongoClient.connect (url,{useNewUrlParser:true},function (err,client) {
        const db = client.db(dbName)
        const collection = db.collection('registerData')
        collection.findOne({userName},(err,docs) => {
            if(docs){
                result.status = 1
                result.msg = '账号已存在'
                client.close()
                res.json(result)
            }else{
                collection.insertOne(req.body,(err,result1) => {
                    if(!result1){
                        result.status = 2
                        result.msg = '注册出现异常'
                        res.json(result)
                    }else{
                        res.json(result)
                    }
                    client.close()
                })               
            }
        })       
    })
}

module.exports ={
    getRegisterPage,
    getRegisterData,
    getLoginPage,
    getVcode,
    doLogin
}