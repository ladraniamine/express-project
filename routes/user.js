const express = require('express')
const router = express.Router()
const {User , validateUser} = require('../model/user')

//add new user
router.post('/' , async(req,res)=>{
 try{
  const err =  validateUser(req.body)
  if(err){
   return res.send(err.message)
  }
   //add the new user
   const user = new User({
       fullname:req.body.fullname,
       email:req.body.email,
       password:req.body.password
   })
   await user.save()
   res.send(user)
 }catch(err){
  return res.send('there is an err you should fix it')
 }
})

module.exports = router