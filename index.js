const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const employees = require('./routes/employees')
const user = require('./routes/user')
const mongoose = require('mongoose')
const app = express()

//for devlopment envirement 
if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
}
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/expDB", { useNewUrlParser: true })
.then(()=> console.log("connected to database"))
.catch((error)=>console.error("there is an error" + error))

//using the middlewares
app.use(helmet())
app.use(express.json())
app.use('/employees', employees)
app.use('/user' , user)

//running the server
const PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
    console.log(`app ronning on PORT ${PORT}...`)
})