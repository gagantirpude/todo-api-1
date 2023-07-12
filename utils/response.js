//* Response
export const response = async (
  req,
  res,
  success,
  statusCode,
  message,
  data,
  next
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
