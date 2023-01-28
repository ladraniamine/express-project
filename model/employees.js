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

const validateEmployee = (body)=>{
  const schema = joi.object( {
    fullname: joi.string().min(3).required(),
    salery:joi.number().integer().required()
  })
  
   const {error} = schema.validate(body);
    return error
}

const validateEmployeeput = (body)=>{
  const schema = joi.object( {
    fullname: joi.string().min(3).required(),
  })
  
   const {error} = schema.validate(body);
    return error
}
module.exports = {validateEmployee , Employee, validateEmployeeput}
