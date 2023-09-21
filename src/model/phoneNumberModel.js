const mongoose =require('mongoose')

const phoneNumberSchema= new mongoose.Schema({
otp : {
    type : String
}, 
phone_number: {
    type : String 
},

})
module.exports = mongoose.model('phone_number', phoneNumberSchema)