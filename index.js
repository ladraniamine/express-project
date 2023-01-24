const express = require('express')
const app = express()

app.get('/',(req,res)=>{
  res.send('welcome to home page')
})

app.listen(3000 , ()=>{
  console.log('app ronning on port 3000...')
})