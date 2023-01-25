const express = require('express')
const log1 = require('./logger/logging')
const helmet = require('helmet')
const morgan = require('morgan')
const employees = require('./employees/employees')
const app = express()

//using the middlewares
app.use(morgan('tiny'))
app.use(helmet())
app.use(express.json())
app.use(log1)

app.use('/', employees)

//running the server
const port = process.env.port || 3000
app.listen(port , ()=>{
    console.log(`app ronning on port ${port}...`)
})