// exports.getRegisterPage = (req,res) => {
//     console.log('这是注册页面');   
// }
const path = require('path')
const getRegisterPage =  (req,res) => {
    res.sendFile(path.join(__dirname,'../static/views/register.html')) 
}

module.exports ={
    getRegisterPage
}