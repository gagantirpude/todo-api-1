import jwt from "jsonwebtoken";

//* Cookie Received as Argument
export const sendCookie = (
  user,
  req,
  res,
  statusCode = 200,
  success,
  massage
) => {
  //* Token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  //* Response
  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 min
      sameSite: "none",
      secure: true,
    })
    .json({
      success,
      massage,
      // user,
    });
};

// console.log(process.env.NODE_ENV);
// console.log(process.env.NODE_ENV === "DEVELOPMENT");

//sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
//secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
// sameSite : "lax",
