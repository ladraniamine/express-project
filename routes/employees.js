const express = require('express')
const {Employee,validateEmployee,validateEmployeeput} = require('../model/employees')
const router = express.Router()

//get all employees 
router.get('/',async(req,res)=>{
  try{
        const employees = await Employee.find()
        res.send(employees)
  }catch(err){
        es.status(404).send("there is an err")
  }
})
//get employee by id
router.get('/:id',async(req,res)=>{
try{
      const employee = await Employee.find({_id:req.params.id})
      if(!employee){
       return res.send('this user is not exist in our database')
      }
      res.send(employee)
}catch(err){
      return res.status(404).send("there is an err")
}
})

//add new employees
router.post('/', async(req,res)=>{
 try{
      const err = validateEmployee(req.body)
      if(err){
       return res.send(err.message)
      }
      const newemployee = new Employee({
        fullname:req.body.fullname,
        salery:req.body.salery
      })
      await newemployee.save()
      res.send(newemployee)
 }catch(err){
    return res.status(404).send('there is an err')
 }
})

//uptade an employee by id
router.put('/:id',async(req,res)=>{
      try{
        const err =  validateEmployeeput(req.body)
        if(err){
         return res.send(err.message)
        }
         //
       const employee = await Employee.findByIdAndUpdate(req.params.id,{
         fullname:req.body.fullname
       },{new:true})
 
       if(!employee){
         return res.send('invalide id')
       }
       res.send(employee)
      }catch(err){
        res.send(err.message)
      }
})

//remove an employee
router.delete('/:id',async(req,res)=>{
try{
      const employee = await Employee.findByIdAndRemove(req.params.id)
    if(!employee){
      return res.status(404).send("invalid id")
    }
    res.send(employee)
}catch(err){
    return res.send(err.message)
}
})

module.exports = router