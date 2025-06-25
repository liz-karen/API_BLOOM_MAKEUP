import { Request, Response } from 'express';
import * as model from '../models/bloom-models';

// Obtenemos todos los productos
export const getAll = (_req: Request, res: Response) => {
  const products = model.getAllProducts
  res.json(products);
};

// Obtenemos productos por id
export const getById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const product = model.findProductById(id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  res.json(product);
};

// Agregamos nuevo producto
export const add = (req: Request, res: Response) => {
  const newProduct = model.addProduct(req.body);
  res.status(201).json(newProduct);
};

// Actualizamos/Modificamos un producto existente por id
export const update = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const updated = model.updateProduct(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });

  res.json(updated);
};

// Borramos un producto por id
export const remove = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const deleted = model.deleteProduct(id);
  if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });

  res.status(204).send();
};