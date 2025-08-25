import jwt from 'jsonwebtoken'

const authMiddleware = async (err, req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next({ status: 401, message: "No Token provided" });
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decoded.userId; 
    next();
  } catch (error){
    console.log(error);
    return next({ status: 401, message: "Invalid token" });
  }
};

export default authMiddleware;
