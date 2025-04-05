const responseHandler = {
    success: (res, data = null, message = "Success", statusCode = 200) => {
      return res.status(statusCode).json({
        status: "success",
        statusCode,
        message,
        data,
      });
    },
  
    error: (res, error, message = "Internal Server Error", statusCode = 500) => {
      return res.status(statusCode).json({
        status: "error",
        statusCode : error?.statusCode || statusCode,
        message,
        error: error?.message || error,
      });
    },
  
    validationError: (res, validationErrors, message = "Validasi gagal") => {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message,
        errors: validationErrors,
      });
    }
  };
  
  module.exports = responseHandler;
  