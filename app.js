if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const multer = require('multer')
const upoloadRouter = require("./routes/upload")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
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

app.listen(3000, () => {
    console.log("listning on port 3000")
})