import { userValidation, userUpdateValidation } from "../validations/users.validation.js";
import Users from "../models/users.model.js";
import nodemailer from "nodemailer";
import { totp } from "otplib";
import bcrypt from "bcrypt";
import fs from "fs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Op, where } from "sequelize";

dotenv.config();
const TOTP_KEY = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdulborimahammadjanov86@gmail.com",
    pass: "srhp mtgm uyia fxhn",
  },
});

totp.options = { step: 1800, digits: 6 };

async function register(req, res) {
  try {
    const filename = req.file ? req.file.filename : null;
    const { firstName, lastName, email, password, role, experience, year } = req.body;
    const findUser = await Users.findOne({ where: { email } });
    if (findUser) {
      fs.unlink(req.file.path, (e) => {
        console.log(e ? e.message : "image deleted");
      });
      return res
        .status(403)
        .send({ message: "This account already exists ❗" });
    }

    let userExperience = role == "admin" || role == "student" ? 0 : experience;

    const { error, value } = userValidation({
      firstName,
      lastName,
      email,
      password,
      role,
      experience: userExperience,
      year,
      avatar: filename,
    });
    if (req.file && error) {
      fs.unlink(req.file.path, (e) => {
        console.log(e ? e.message : "image deleted");
      });
      return res.status(400).send({ message: error.details[0].message });
    }

    value.password = await bcrypt.hash(password, 10);
    const registered = await Users.create(value);

    let otp = totp.generate(`${TOTP_KEY}${email}`);

    await transporter.sendMail({
      to: email,
      subject: "One time password",
      html: `This is a Otp to activate account: <h1>${otp}</h1>`,
    });
    res.status(200).send({
      message:
        "Registered successfully ✅, We sent Otp to your Email, Please activate your account",
      data: registered,
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (e) => {
        if (e) {
          console.log(e.message);
        }
      });
    }
    res.status(500).send({ error_message: error.message });
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
      return res.status(405).send({ message: "Email is wrong ❗" });
    }
    let checkOtp = totp.verify({ token: otp, secret: `${TOTP_KEY}${email}` });
    if (!checkOtp) {
      return res.status(403).send({ message: "Otp is wrong ❗" });
    }
    if (findUser.status === "inactive") {
      await Users.update({ status: "active" }, { where: { email } });
    }
    res.status(200).send({ message: "Your account activated successfully" });
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    let checkEmail = await Users.findOne({ where: { email } });

    if (!checkEmail || !(await bcrypt.compare(password, checkEmail.password))) {
      return res.status(404).send({ message: "Email or Password wrong ❗" });
    }

    if (checkEmail.status === "inactive") {
      return res.status(401).send({ message: "You should activate your account ❗" });
    }

    let refreshToken = await refreshTokenGenerate({
      id: checkEmail.id,
      email: checkEmail.email,
      role: checkEmail.role,
    });

    let accessToken = await accessTokenGenereate({
      id: checkEmail.id,
      email: checkEmail.email,
      role: checkEmail.role,
    });

    await checkEmail.update({ refreshToken });
    res.status(200).send({ message: "Logged in successfully", access_token: accessToken });
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

async function refreshToken(req, res) {
    try {
        let checkEmail = await Users.findByPk(req.user.id);
        let refreshSecret = process.env.REFRESH_KEY || "refreshKey";

        let { id } = jwt.verify(checkEmail.refreshToken, refreshSecret);
        if(id !== req.user.id) {
            return res.status(405).send({message: 'Other token ❗'});
        }
        let accessToken = await accessTokenGenereate({id: checkEmail.id, email: checkEmail.email, role: checkEmail.role});
        res.status(200).send({ accessToken });
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

async function accessTokenGenereate(payload) {
  try {
    let accessSecret = process.env.ACCESS_KEY || "accessKey";
    return jwt.sign(payload, accessSecret);
  } catch (error) {
    console.log(error.message);
  }
}

async function refreshTokenGenerate(payload) {
  try {
    let refreshSecret = process.env.REFRESH_KEY || "refreshKey";
    return jwt.sign(payload, refreshSecret);
  } catch (error) {
    console.log(error.message);
  }
}

async function findAll(req, res) {
    try {
        let { role, id } = req.user;
        let findAllUsers = [];

        if(role === "admin") {
            findAllUsers = await Users.findAll({where: {role: {[Op.in]: ['teacher', 'student']}}, attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'role', 'experience', 'year', 'avatar', 'status']});
        }

        else if (role === "teacher") {
            findAllUsers = await Users.findAll({where: {role: {[Op.in]: ['student']}}, attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'role', 'experience', 'year', 'avatar', 'status']});
        }

        else if (role === "student") {
            findAllUsers = await Users.findOne({where: {id}, attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'role', 'experience', 'year', 'avatar', 'status']});
        }

        else {
            return res.status(403).send({message: 'Unauthorized user type ❗'});
        }

        res.status(200).send({data: findAllUsers});
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

async function findOne(req, res) {
    try {
        let { role } = req.user;
        let { id } = req.params;
        let findOneUser = null;

        if(role === "admin") {
            findOneUser = await Users.findOne({where: {id, role: {[Op.in] : ['teacher', 'student']}}});
            if(!findOneUser) {
                return res.status(404).send({message: 'Teacher or Student not found ❗'});
            }
        }

        else if (role === "teacher") {
            findOneUser = await Users.findOne({where: {id, role: 'student'}});
            if(!findOneUser) {
                return res.status(404).send({message: 'Student not found ❗'});
            }
        }

        else if (role === "student") {
            findOneUser = await Users.findOne({where: {id, role: 'student'}});
            if(!findOneUser) {
                return res.status(404).send({message: 'Student not found ❗'});
            }
        } 
        
        else {
            return res.status(403).send({message: 'Unauthorization User tye ❗'});
        }

        res.status(200).send({data: findOneUser});
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

async function update(req, res) {
    try {
        let { id } = req.params;
        let filename = req.file ? req.file.filename : null;
        req.body.avatar = filename;

        const { error, value } = userUpdateValidation(req.body);
        if(error) {
            if(req.file) {
                fs.unlink(req.file.path, (e) => {
                    console.log(e ? e.message : 'image deleted');
                });
            };
            return res.status(400).send({message: error.details[0].message});
        }

        if(value.password) {
            value.password = await bcrypt.hash(value.password, 10);
        }
    
        let updateUsers = await Users.update(value, {where: {id, role: {[Op.in]: ['teacher', 'student']}}, returning: true});
        if(!updateUsers.length) {
            return res.status(400).send({message: 'User not found ❗'});
        }

        let result = await Users.findByPk(id);
        res.status(200).send({message: 'User updated successfully', data: result});
    } catch (error) {
        if(req.file){
            fs.unlink(req.file.path, (e) => {console.log(e ? e.message : 'image deleted');});
        }
        res.status(500).send({error_message: error.message});
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params;
        let deleteUsers = await Users.destroy({where: {id, role: {[Op.in]: ['teacher', 'student']}}});
        if(!deleteUsers) {
            return res.status(404).send({message: 'User or Teacher not found ❗'});
        }
        res.status(200).send({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

export { register, verifyOtp, login, refreshToken, findAll, findOne, update, remove };