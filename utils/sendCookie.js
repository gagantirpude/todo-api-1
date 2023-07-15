import jwt from "jsonwebtoken";

//* Cookie Received as Argument
export const sendCookie = (
  user,
  req,
  res,
  statusCode = 200,
  success,
  message
) => {
  //* Token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  //* Response
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 min
      sameSite: "none",
      secure: true,
    })
    .json({
      success,
      message,
    });
};

// expires: new Date(Date.now() + 15 * 60 * 1000), // 15 min
// maxAge: 15 * 60 * 1000, // 15 min
// user,
// console.log(process.env.NODE_ENV);
// console.log(process.env.NODE_ENV === "DEVELOPMENT");

//sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
//secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
// sameSite : "lax",
