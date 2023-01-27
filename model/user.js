const mongoose = require('mongoose')
const joi = require('joi')

const User = mongoose.model('User', new mongoose.Schema({
  fullname:{
    type:String,
    required:true,
    minlength:3,
    maxlength:44
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minlength:3,
    maxlength:255
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minlength:3,
    maxlength:1025
  }
}))

const validateUser = (body , res)=>{
  const schema = joi.object({
    fullname:joi.string().min(3).max(44).required(),
    email:joi.string().min(3).max(255).required().email(),
    password:joi.string().min(8).max(255).required()
  })
  const {error} = schema.validate(body)
  if(error){
    return res.send(error.message)
  }
}

module.exports = {User,validateUser}