// Middleware - Validación
import { Request, Response, NextFunction } from 'express';

// Validamos el body del producto
const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, brand, price, stock, category } = req.body;

  if (
    typeof name !== 'string' ||
    typeof brand !== 'string' ||
    typeof price !== 'number' ||
    typeof stock !== 'number' ||
    typeof category !== 'string'
  ) {
    return res.status(400).json({ error: 'El producto es inválido' });
  }

  next();
};

module.exports = { validateProduct };
