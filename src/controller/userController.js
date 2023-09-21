const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validIP,
  getIPInfo,
  userCreateSchema,
  userSingleSchema,
  userDeleteSchema,
} = require("../validation/userValidation");
const { verifyPhoneNumberWithOtp } = require("../helper/commonfunction");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createUser = async (req, res) => {
  try {
    const data = req.body;

    const { error, value } = userCreateSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, msg: error.details[0].message });
    }
    const {
      username,
      first_name,
      last_name,
      age,
      gender,
      email,
      password,
      ip_adress,
      otp,
      phone_number,
    } = data;
    const isValidIp = await validIP(ip_adress);
    if (isValidIp.error) {
      return res.status(400).send({ status: false, msg: isValidIp.error });
    }
    const ipInfo = await getIPInfo(ip_adress);

    console.log(ipInfo);
    if (ipInfo.error) {
      return res.status(400).send({ status: false, msg: ipInfo.error });
    }
    const isVAlidPhoneNumberAndOtp = await verifyPhoneNumberWithOtp(
      phone_number,
      otp
    );

    if (isVAlidPhoneNumberAndOtp.error) {
      return res
        .status(400)
        .send({ status: false, msg: isVAlidPhoneNumberAndOtp.error });
    }

    const findUser = await userModel.findOne({ email: email });
    if (findUser) {
      return res
        .status(400)
        .send({ status: false, msg: "user already created" });
    }
    const hash = bcrypt.hashSync(password, 10);
    let url;
    await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      { public_id: "olympic_flag" },
      function (error, result) {
        if (result) {
          url = result.url;
        } else {
          return res.status(400).send({ status: false, msg: error });
        }
      }
    );
    console.log("+91" + phone_number);
    const user = await userModel.create({
      photo: url,
      username: username,
      first_name: first_name,
      last_name: last_name,
      age: age,
      gender: gender,
      email: email,
      password: hash,
      phone_number: "+91" + phone_number,
      ip_adress: ip_adress,
      otp: otp,
    });
    return res
      .status(201)
      .send({ status: 200, msg: "user created successfully ", data: user });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ status: false, msg: "user not found" });
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res
        .status(400)
        .send({ status: false, msg: "user fabriation error" });
    }
    const token = jwt.sign({ user: user._id }, "login");
    return res
      .status(200)
      .send({ status: true, msg: "login successfully", data: token });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    let url;
    if (req.files.photo) {
      await cloudinary.v2.uploader.upload(
        path.tempFilePath,
        { public_id: "olympic_flag" },
        function (error, result) {
          url = result.url;
        }
      );

      const userUpdate = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: data }
      );
      return res
        .status(200)
        .send({ status: true, msg: "update successfully", data: userUpdate });
    }
    const userUpdate = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          photo: url,
          username: username,
          age: age,
          gender: gender,
          password: password,
          email: email,
        },
      }
    );
    return res
      .status(200)
      .send({ status: true, msg: "update successfully", data: userUpdate });
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = userSingleSchema.validate(id);
    if (error) {
      return res
        .status(400)
        .json({ status: false, msg: error.details[0].message });
    }
    const user = await userModel.findById(id);
    if (user) {
      return res
        .status(200)
        .send({ status: true, msg: "user found", data: user });
    } else {
      return res.status(400).send({ status: false, msg: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllUser = async (req, res) => {
  try {
    const findAllUser = await userModel.find();
    return res
      .status(200)
      .send({ status: true, msg: "user list", data: findAllUser });
  } catch (error) {
    console.log(error);
  }
};

const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = userDeleteSchema.validate(id);
    if (error) {
      return res
        .status(400)
        .json({ status: false, msg: error.details[0].message });
    }
    const findUser = await userModel.findById(id);
    if (findUser) {
      const deleteUser = await userModel.deleteOne(id);
      res.status(200).send({ status: true, msg: "user delete successfully " });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "user already delete" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  updateUser,
  getUserById,
  getAllUser,
  userDelete,
  userLogin,
};
