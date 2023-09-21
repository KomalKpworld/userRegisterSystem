const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  photo: {
    type: String,
  },
  username: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: String
  },
  ip_adress: {
    type: String
  },
  otp: {
    type: String
  },
  forgot_password_token:{
    type: String
  }
 
});
module.exports = mongoose.model('user', userSchema)