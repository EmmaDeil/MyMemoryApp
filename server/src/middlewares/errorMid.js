const errorMid = (err, req, res, next) => {
  res.set('Access-Control-Allow-Origin', '');
  // res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Credentials', true);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
}

export default errorMid;