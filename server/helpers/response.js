class response {
  static errorMessage = (req, res, status, msg) => {
    res.status(status).json({
      status,
      error: msg,

    });
  };

  static successMessage = (req, res, status, msg, data) => {
    res.status(status).json({
      status,
      message: msg,
      data,
    });
  };
}
export default response;
