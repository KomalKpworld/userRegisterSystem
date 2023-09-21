const ipinfo = require('ipinfo');
const rp = require('request-promise');
const Joi = require('joi')
const ipinfoToken = process.env.IPINFOTOKEN ;
const ipinfoClient = new ipinfo(ipinfoToken);

function validIP(ipAddress) {
  const ipPattern = (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/).test(ipAddress)
  if(!ipPattern) return {error: "Ip Adressv format is wrong"}
  return true
}

async function getIPInfo(ipAddress) {
  const ipInfoUrl = `https://ipinfo.io/${ipAddress}/json`;
  try {
    const response = await rp({ uri: ipInfoUrl, json: true });
    if(response.error){
      return {error: response.eroor}
    }
    return response 
  } catch (error) {
  return {error: error.msg}
  }
}

const userCreateSchema = Joi.object().keys({
  username:Joi.string().required(),
  forgot_password_token:Joi.string().optional(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  phone_number: Joi.string().length(10).pattern(/^[0-9]+$/),
  email: Joi.string().email().required(),
  photo: Joi.string().optional(),
  password: Joi.string().max(15).required(),
  otp: Joi.string().max(6).required(),
  ip_adress: Joi.string(),
  age: Joi.number()
});

 const userSingleSchema = Joi.object().keys({
  id: Joi.string().required(),
});

const userDeleteSchema = Joi.object().keys({
  deleteId: Joi.string().required(),
});


module.exports ={validIP , getIPInfo, userCreateSchema, userSingleSchema, userDeleteSchema }