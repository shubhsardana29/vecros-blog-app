import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isBlacklisted } from '../utils/tokenBlacklist';


interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload & { userId: number };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log('Full Authorization Header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({ error: 'Token has been invalidated' });
  }

  try {
    console.log('Received token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { userId: number };
    console.log('Decoded JWT:', decoded);

    // Log token details
    console.log('Token details:', {
      userId: decoded.userId,
      issuedAt: decoded.iat ? new Date(decoded.iat * 1000).toISOString() : 'Not available',
      expiresAt: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : 'Not available',
      currentTime: new Date().toISOString()
    });

    // Check if token is expired (if exp is present)
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ error: 'Token has expired' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};