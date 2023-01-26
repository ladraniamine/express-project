const express = require('express')
const {Employee,validateEmployee,validateEmployeeput} = require('../model/employees')
const router = express.Router()

//get all employees 
router.get('/',async(req,res)=>{
  const employees = await Employee.find()
  res.send(employees)
})
//get employee by id
router.get('/:id',async(req,res)=>{
const employee = await Employee.find({_id:req.params.id})
if(!employee){
  return res.send('this user is not exist in our database')
}
res.send(employee)
})

//add new employees
router.post('/', async(req,res)=>{
  
  validateEmployee(req.body , res)
  
const newemployee = new Employee({
  fullname:req.body.fullname,
  salery:req.body.salery
  })
await newemployee.save()
res.send(newemployee)
})

//uptade an employee by id
router.put('/:id',async(req,res)=>{
       validateEmployeeput(req.body , res)
        //
      const employee = await Employee.findByIdAndUpdate(req.params.id,{
        fullname:req.body.fullname
      },{new:true})

      if(!employee){
        return res.send('invalide id')
      }
      res.send(employee)
})

//remove an employee
router.delete('/:id',async(req,res)=>{
const employee = await Employee.findByIdAndRemove(req.params.id)
if(!employee){
  return res.status(404).send("invalid id")
}
res.send(employee)
})

module.exports = router