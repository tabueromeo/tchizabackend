const express = require('express')
const passport = require('passport')
const UserModel = require('../model/user')

const routes = express.Router()

routes.get('/login',passport.authenticate('login',{session:false}),function(req,res,next){
    console.log(req.user);
res.status(200).json({
    message:'authentification reussi',
    user:req.user
})

})

routes.post('/signup',async function(req,res,next){
    console.log(req.email)
 const user = await UserModel.findOne({'email':req.email})
   
 if(!user){
            UserModel.create({'email':req.email,'password':req.passport},function(err,user){
                console.log(user)
                if(err){res.status(500).json('erreur interne')}
                res.status(201).json({
                    msg:'creation reussie',
                    user:user
                })
            })
      
 }else{
    res.status(500).json('utilisateur existant')
 }
        

})

module.exports = routes