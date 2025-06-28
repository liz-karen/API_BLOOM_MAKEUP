// Middleware - Autenticación
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

// Interfaz para definir qué información queremos del token
interface JwtPayload {
  id: string;
  usermane: string;
}

// Clave secreta para verificar el token
const SECRET_KEY = process.env.JWT_SECRET || 'grupo_bloom';

// Validamos el token
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No se envió el token' });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as any).user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = { authenticateToken };
