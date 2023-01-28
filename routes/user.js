const express = require('express')
const router = express.Router()
const {User , validateUser} = require('../model/user')

//add new user
router.post('/' , async(req,res)=>{
  validateUser(req.body , res)

  const user = new User({
      fullname:req.body.fullname,
      email:req.body.email,
      password:req.body.password
  })
  await user.save()
  res.send(user)
})

module.exports = router