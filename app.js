const express = require('express')
const session = require('express-session')
const MongoStore = require("connect-mongo")(session)
const flash = require('connect-flash')
const app = express()
const router = require('./router')
const ngrok = require('ngrok')
require('./cron')

ngrok.connect({
    proto: 'http', 
    addr: 3000, 
    authtoken: '2JSghATKhzlqxwPYzpwrho0qFz1_5oa4R29XvnjXKCGJpicvZ',
}).then(url => console.log(url))

let sessionOptions = session({   
    secret: "Game of Codes",
    store: new MongoStore({client:require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge:1000*60*60*24, httpOnly:true}    
})

app.use(sessionOptions)   
app.use(flash()) 
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

app.use(function(req,res,next){
    res.locals.user = req.session.user
    next()
})

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(function(req, res, next) {
    if(req.headers['x-amz-sns-message-type']){
        let body = ''

        req.on('data', chunk => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try{
                req.body = JSON.parse(body)
                next()
            } 
            catch(err){
                next(err)
            }
        })
    } 
    else{
        next()
    }
})

app.use('/', router)

module.exports = app