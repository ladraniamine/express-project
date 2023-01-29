const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken')

//user schema
const userSchema = new mongoose.Schema({
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
  password:{
    type:String,
    required:true,
    minlength:3,
    maxlength:1025
  }
})
  //function that return id in form of token
  userSchema.methods.generateTokens = function (){
    const token = jwt.sign({_id:this._id} , 'privateKey')
    return token
  }

  //user model
const User = mongoose.model('User', userSchema )

//validation the req.body using joi package
const validateUser = (body)=>{
  const schema = joi.object({
    fullname:joi.string().min(3).max(44).required(),
    email:joi.string().min(3).max(255).required().email(),
    password:joi.string().min(8).max(255).required()
  })
  const {error} = schema.validate(body)
  return error
}

module.exports = {User,validateUser}