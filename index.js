const express = require("express")
const bodyParser = require("body-parser")
const moongoose = require("mongoose")
const passport = require("passport");
const dotenv = require("dotenv")

const route = require('./routes/routes')
require('./auth/auth')

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',route)
app.get('/secret',passport.authenticate('jwt',{session:false}),function(res,req,next){
    console.log(req)
    res.status(200).json("bien autorisé")
})
moongoose.connect(process.env.BD_URL)
.then(()=>console.log("connecté à la bd"))
.catch((error)=>console.log(error));

moongoose.Promise = global.Promise;

app.get('/',(req,res,next)=>{
    res.status(200).json("bienvenus à la boutique de lingerie")
})


app.listen(process.env.PORT,()=>console.log("server listen on port "+process.env.PORT))