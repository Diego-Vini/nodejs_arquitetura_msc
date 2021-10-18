const errorMiddleware = (err, req, res, _next) => {
  const statusByErrorCode = {
    invalidData: 400
  }

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ error: { message: err.message }})
}

module.exports = errorMiddleware;