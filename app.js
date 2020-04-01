if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express')
const app = express()
const expresslayouts = require('express-ejs-layout') 
const bodyParser = require('body-parser')
const ejs = require('ejs')
const multer = require('multer')
const upoloadRouter = require("./routes/upload")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use('expresslayouts')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL , 
    
     { 
        useUnifiedTopology: true,
        useNewUrlParser: true })
       const db = mongoose.connection
       db.on('error', error => Console.error(error))
        db.on('open', () => console.log('Connected to Mongoose'))

app.use('/', upoloadRouter)

app.listen(process.env.PORT || 3000)
