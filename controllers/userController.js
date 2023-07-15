//* import
import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { sendCookie } from "../utils/sendCookie.js";
import {
  removeCookie,
  removeCookie2,
  removeCookie3,
} from "../utils/removeCookie.js";
import { response } from "../utils/response.js";

//* Register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let users = await userModel.findOne({ email });

    //* Condition
    if (users) {
      return next(new ErrorHandler("User Already Exist", 404));
    } else {
      //* Crypt Password
      const hashedPassword = await bcrypt.hash(password, 10);

      users = await userModel({
        name,
        email,
        password: hashedPassword,
      });

      users.save();

      //* Send Cookie and JsonWeb token
      sendCookie(users, req, res, 201, true, "User Register Successfully");
    }
  } catch (error) {
    next(error);
  }
};

//* Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let users = await userModel.findOne({ email }).select("+password");

    if (!users) {
      return next(new ErrorHandler("User Not Found", 404));
    } else {
      //* Compare Password and Database Password
      const isMatch = await bcrypt.compare(password, users.password);

      //* Condition for Password
      if (!isMatch) {
        return next(new ErrorHandler("Invalid Email & Password", 404));
      } else {
        //* Send Cookie and JsonWeb token as Parameter
        sendCookie(users, req, res, 200, true, "User Login Successfully");
      }
    }
  } catch (error) {
    next(error);
  }
};

//* Logout User
export const logout = async (req, res, next) => {
  try {
    //* Remove Cookie
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: "User Logouts",
      });
  } catch (error) {
    next(error);
  }
};

//* All User
export const allusers = async (req, res, next) => {
  try {
    const user = await userModel.find();

    //* Response
    response(req, res, true, 200, "User Found", user, next);
  } catch (error) {
    next(error);
  }
};

//* Get User By Profile(Cookies)
export const getProfile = async (req, res, next) => {
  try {
    //* Response
    response(req, res, true, 200, "Login Successfully", req.user, next);
  } catch (error) {
    next(error);
  }
};
