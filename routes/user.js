const express = require('express')
const router = express.Router()
const {User , validateUser} = require('../model/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')

//add new user
router.post('/' , async(req,res)=>{
 try{
      const err =  validateUser(req.body)
      if(err){
          return res.send(err.message)
      }
      //we check if we have this email inn our database
      let user = await User.findOne({email:req.body.email})
      //in the case i have this user in my database
      if(user){
          return res.send('we have this user in our database')
      }

      //add the new user
        //i use pick for just accepting the fullname and email and password requests
        user = new User(_.pick(req.body , ['fullname','email','password']))
        
        //hash the password using bcrypt
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        user.password = await bcrypt.hash(user.password , salt)

        //save the user in our database
      await user.save()
      const token = user.generateTokens()
        //i used pick to response with just fullname and email that come from user
      res.header('auth-token', token).send(_.pick(user , ['fullname','email']))
 }catch(err){
  return res.send('there is an err you should fix it')
 }
})

module.exports = router