var axios = require('axios');

var express = require('express');
var app = express();
var ip = require('ip');
// 托管静态文件yz
app.use(express.static('../vueClient/client/dist/'));

app.get('/', function (req, res) {
  res.send('Hello World!');
  console.log('tt');
});

app.get('/login/callback',  async(req, res) => {
  var code = req.query.code; // GitHub 回调传回 code 授权码
  console.log(code)

  // 带着 授权码code、client_id、client_secret 向 GitHub 认证服务器请求 token
  let res_token = await axios.post('https://github.com/login/oauth/access_token',
  {
    client_id: 'Iv1.38662f7ecc0b2882',
    client_secret: '7946daeb7061e99101a4a62ca7cdab5d6e9db41e',
    code:code
  })
  console.log(res_token.data)

  let token = res_token.data.split('=')[1].replace('&scope','')

   // 带着 token 从 GitHub 获取用户信息
   let github_API_userInfo = await axios.get(`https://api.github.com/user?access_token=${token}`)
   console.log('github 用户 API：',github_API_userInfo.data)


   let userInfo = github_API_userInfo.data

   // 用户使用 GitHub 登录后，在数据库中存储 GitHub 用户名
   users.findOne({username:userInfo.name},(err,oldusers)=>{ // 看看用户之前有没有登录过，没有登录就会在数据库中新增 GitHub 用户
    if(oldusers) {
        res.cookie('auth_token',res_token.data)
        res.cookie('userAvatar',userInfo.avatar_url)
        res.cookie('username',userInfo.name)

        res.redirect(301,'http://172.30.54.113:3000/') // 从GitHub的登录跳转回我们的客户端页面
        return
    }else
    new users({
        username:userInfo.name,
        password:'123', // 为使用第三方登录的能够用户初始化一个密码，后面用户可以自己去修改
    }).save((err,savedUser)=>{
        if(savedUser){
            res.cookie('auth_token',res_token.data)
            res.cookie('userAvatar',userInfo.avatar_url)
            res.cookie('username',userInfo.name)

            res.redirect(301,'http://172.30.54.113:3000/') // 从GitHub的登录跳转回我们的客户端页面
        }
    })
   })
});

var server = app.listen(3000, ip.address(), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});