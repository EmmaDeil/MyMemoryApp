import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "No Token provided" });
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; 
    next();
  } catch (error){
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
