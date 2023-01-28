const express = require('express')
const router = express.Router()
const {User} = require('../model/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const joi = require('joi')

router.post('/' , async(req , res)=>{
  const err = validate(req.body)
  if(err){
    return res.status(404).send(err.message)
  }
  let user = await User.findOne({email:req.body.email})

  if(!user){
    return res.status(404).send('invalid email or password')
  }

  const checkPassword = await bcrypt.compare(req.body.password , user.password)
  if(!checkPassword){
    return res.status(404).send('invalid email or password')
  }

  res.send('ok')
})

function validate(user){
  const schema = joi.object({
    email:joi.string().min(3).max(255).required().email(),
    password: joi.string().min(8).max(255).required()
  })

  const {error} = schema.validate(user)
  return error
}

module.exports = router