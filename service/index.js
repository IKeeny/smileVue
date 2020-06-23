const Koa = require('koa')
const app = new Koa()
//引入connect
const {connect,initSchema} = require('./database/init.js')
const mongoose = require('mongoose')
//接收post数据
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const Router = require('koa-router')

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user')
// let home = require('./appApi/home')
let goods = require('./appApi/goods')

//装载所有子路由
let router = new Router()
router.use('/user',user.routes())
// router.use('/home',home.routes())
router.use('/goods',goods.routes())
//egg.js

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// //立即执行函数
;(async () =>{
    await connect()
    initSchema()
    // const User = mongoose.model('User')
    // let oneUser = new User({username:'jerry',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    // let user = await (await User.findOne({})).execPopulate()
    // console.log('................................')
    // console.log(user)
    // console.log('................................')
})()

app.use(async(ctx)=>{
    ctx.body = '<h1>Hello Koa</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})