const express = require('express')
const log1 = require('./logger/logging')
const helmet = require('helmet')
const morgan = require('morgan')
const employees = require('./employees/employees')
const mongoose = require('mongoose')
const app = express()
//for devlopment envirement 
if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    app.use(log1)
}
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/expDB", { useNewUrlParser: true })
.then(()=> console.log("connected to database"))
.catch((error)=>console.error("there is an error" + error))

//using the middlewares
app.use(helmet())
app.use(express.json())
app.use('/', employees)

//running the server
const port = process.env.port || 3000
app.listen(port , ()=>{
    console.log(`app ronning on port ${port}...`)
})