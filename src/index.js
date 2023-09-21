require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const userRoute = require("./route/userRoute")
const phoneNumberRoute = require("./route/phoneNumberRoute")
const app = express()

const fileUpload = require('express-fileupload');



app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(bodyParser.urlencoded({     
    extended: false
  })); 
  app.use( bodyParser.json()); 
mongoose.connect(process.env.MONGODBCONNECTIONSTRING).then(()=>{
console.log("mongodb is connected ")
}).catch((err)=>{
    console.log(err)
})

app.use('/user', userRoute)
app.use('/phone-number', phoneNumberRoute)
app.listen(3000, function(){
console.log("app is running on 3000")
})
