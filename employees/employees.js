const express = require('express')
const joi = require('joi')

const router = express.Router()

const employees = [
  {id:1, fullname:"amine ladrani", salery:3000},
  {id:2, fullname:"dado ladrani", salery:4000},
  {id:3, fullname:"omar ladrani", salery:2000}
]

//get all employees 
router.get('/',(req,res)=>{
res.send(employees)
})
//get employee by id
router.get('/:id',(req,res)=>{
const employee = employees.find( emp => emp.id == req.params.id)
if(!employee){
return res.send('sorry we dont have this user in our database')
}
res.send(employee)
})

//add new employees
router.post('/', (req,res)=>{
const schema = joi.object( {
  id:joi.number().integer().min(4).required(),
  fullname: joi.string().min(3).required(),
  salery:joi.number().integer().required()
})

//  const catcherr =  schema.validate(req.body);
 const {error} = schema.validate(req.body);

if(error){
return res.send(error.message)
}
  
const newemployee = {
id:req.body.id,
fullname:req.body.fullname,
salery:req.body.salery
}
employees.push(newemployee)
res.send(newemployee)
})

//uptade an employee by id
router.put('/:id',(req,res)=>{
const employee = employees.find(emp => emp.id == req.params.id)
if(!employee){
return res.send("couldn't found employee")
}
employee.fullname = req.body.fullname
employee.salery = req.body.salery

res.send(employee)
})

//remove an employee
router.delete('/:id',(req,res)=>{
const employee = employees.find(emp => emp.id == req.params.id)
if(!employee){
return res.send("we couldn't found this employee")
}
const idxOfRmemployee = employees.indexOf(employee)
employees.splice(idxOfRmemployee,1)
res.send(employee)
})

module.exports = router