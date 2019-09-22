require('dotenv').config()

const saslprep = require('saslprep')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cryptoRandomString = require('crypto-random-string')

const mongoURL = `mongodb://${process.env.DBU}:${process.env.DBP}@${process.env.DBIP}:${process.env.DBPORT}/${process.env.DBNAME}`
mongoose.set('useUnifiedTopology', true)
mongoose.connect(mongoURL, {useNewUrlParser: true})
.catch(err => {
    console.log("Error connecting to database: ", err)
})

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    role: Number
})

var eniroSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    uploader: String,
    uploaded: Date
})


var Users = mongoose.model('users', userSchema)
var Eniro = mongoose.model('eniro', eniroSchema)

exports.get20Posts = async (ctx) => {
    ctx.set('Content-Type', 'application/json')

    const posts = await Eniro.find({}, 'image title description uploader uploaded').sort({x:1}).limit(20)
    ctx.body = posts
}


exports.postEniro = async (ctx) => {
    ctx.set('Content-Type', 'application/json')

    var username = ctx.request.body.uploader
    var token = ctx.request.body.token

    const findToken = await Users.findOne({username: username}).select(['-_id', '-__v'])
    if (!findToken) {
        ctx.body = { error: "Invalid user." }
    } else {
        if (findToken.token == token && findToken.role != 0) {
            var z = await articleCreation(ctx.request.body)
            ctx.body = z
        } else {
            ctx.body = { error: "Authentication Failed."}
        }
    }
}

exports.postLogin = async (ctx) => {
    ctx.set('Content-Type', 'application/json')
    var username = ctx.request.body.username
    var rawPassword = ctx.request.body.password

    var parsed = ctx.request.body

    const data = await Users.findOne({username: username}).select(['-_id', '-__v'])
    if (!data) {
        console.log("ye")
        ctx.body = { error: "User not found." }
    } else {
        var authorized = await passwordCompare(rawPassword, data.password)
        if (authorized == true) {
            
            ctx.body = data
        } else {
            
            ctx.body = { error: "Authorization Failed. Incorrect password perhaps?" }
        }
    }
}

exports.postRegister = async (ctx) => {
    ctx.set('Content-Type', 'application/json')
    var username = ctx.request.body.username
    var rawPassword = ctx.request.body.password

    var parsed = ctx.request.body

    const data = await Users.find({ username: username}).select(['-_id', '-__v'])
    if (data[0] == null) {
        var body = await userRegistration(username, rawPassword)
        ctx.body = body
    } else {
        ctx.body = { error: "User already exists!" }
    }
}

function articleCreation (postInfo) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var plat = new Eniro({ image: postInfo.image, title: postInfo.title, description: postInfo.description, uploader: postInfo.uploader, uploaded: new Date() })
            plat.save(function (err, plats) {
                if (err) resolve({ error: "I don't know what happened. Try again? DM me (Auros#0001) if this persists"})
                resolve(plats)
            })
        }, 300)
    })
}

function userRegistration (username, rawPassword) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            bcrypt.genSalt(10, async function(err, salt) {
                bcrypt.hash(rawPassword, salt, async function(err, hash) {
                    var randomToken = cryptoRandomString({length: 63})
                    var plat = new Users({ username: username, password: hash, token: randomToken, role: 0 })
                    await plat.save(function (err, plats) {
                        if (err) resolve({ error: "I honestly don't know what just happened." })
                        resolve({ username: username, token: randomToken, role: 0 })
                    })
                })
            })
        }, 300)
    })
}

function passwordCompare (local, fetched) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            bcrypt.compare(local, fetched).then((res) => {
                resolve(res)
            })
        }, 300)
    })
}