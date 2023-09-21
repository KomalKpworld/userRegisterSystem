const phoneNumberModel = require("../model/phoneNumberModel");

const verifyPhoneNumberWithOtp = async (phone_number, otp) => {
    console.log("+91"+phone_number)
  let verifyPhoneNumber = await phoneNumberModel.findOne({
    phone_number: "+91" + phone_number,
  });
  if (!verifyPhoneNumber) {
    return { error: "phoneNumber is not registerd" };
  }
  if (verifyPhoneNumber.otp !== otp) {
    return { error: "Invalid opt " };
  }
  return true
};
module.exports = { verifyPhoneNumberWithOtp };
