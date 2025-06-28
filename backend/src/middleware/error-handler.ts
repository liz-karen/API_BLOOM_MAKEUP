// Middleware - Manejo de errores globales
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Error: JSON incorrecto' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Error en el servidor interno'
  });
};

module.exports = { errorHandler };
