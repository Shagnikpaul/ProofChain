import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization format' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, SUPABASE_JWT_SECRET, {
      algorithms: ['HS256'],
      audience: 'authenticated'
    });

    req.userId = payload.sub;
    req.userEmail = payload.email;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default verifyToken