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

export const removeCookie2 = async (res, StatusCode, success, message) => {
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
};

export const removeCookie3 = (req, statusCode, success, message) => {
  return res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({
      success,
      message,
    });
};
