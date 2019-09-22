require('dotenv').config();
const api = require('./api')

const Koa = require('koa')
const Cors = require('@koa/cors')
const Logger = require('koa-logger')
const Body = require('koa-body')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

app.use(Cors())
app.use(Logger())
app.use(Body())

router.post('/api/auth/login', api.postLogin)
router.post('/api/auth/register', api.postRegister)
router.post('/api/post', api.postEniro)
router.get('/api/latest', api.get20Posts)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.APORT)