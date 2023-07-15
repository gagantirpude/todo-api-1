//* Remove Cookie

export const removeCookie = async (res, StatusCode, success, message, next) => {
  try {
    return res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(StatusCode).json({
      success,
      message,
    });
  } catch (error) {
    next(error);
  }
};
