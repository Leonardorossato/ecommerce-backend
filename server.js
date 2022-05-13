const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, ()=>{
    console.log(`Server is runnin on the port : ${PORT}`)
})