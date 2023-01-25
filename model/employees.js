const joi = require('joi')
const mongoose =require('mongoose')

//add a schema
const Employee = mongoose.model('Employee', new mongoose.Schema({
  fullname:{
    type:String,
    required:true,
    minlength:3,
    maxlength:44
  },
  salery:{
    type:Number,
    required:true
  }
}))

module.exports = Employee