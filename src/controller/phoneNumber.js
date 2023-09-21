const phoneNumber = require("../model/phoneNumberModel")
  const twilio = require('twilio');
  const accountSid = 'AC10c1131780a3c30c0b6780e490c54604';
        const authToken = ['87270ac3adca540091aa5670a9363896'];
  
  const client = new twilio(accountSid, authToken);
  

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  const sendOTP=  async (req,res) =>{
    try {
      const generatOTP = generateOTP();
      console.log(req.body.phone_number)
         await client.messages
          .create({
              body: `its your veriy code ${generatOTP} please veriy the phone number`,
              from: `+12563048842`,
              to: "+91"+`${req.body.phone_number}`
          })
          const otp = await phoneNumber.create({otp: generatOTP, phone_number: "+91"+`${req.body.phone_number}`})
          res.status(200).send({status: true, msg: "otp send succesfully ", data: otp})
      console.log('OTP sent successfully.');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }
  
  module.exports= {sendOTP}