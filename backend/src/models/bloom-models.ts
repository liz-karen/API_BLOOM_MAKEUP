import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../database/products.json');

// Leemos y devolvemos todos los productos
export const getAllProducts = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Guardamos una lista completa de productos en el archivo
export const saveProducts = (products: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

// Agregamos un nuevo producto con ID numérico incremental
export const addProduct = (productData: any) => {
  const products = getAllProducts();
  const nextId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const newProduct = { id: nextId, ...productData };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

// Buscamos un producto por su ID 
export const findProductById = (id: number) => {
  const products = getAllProducts();
  return products.find(p => p.id === id);
};

// Actualizamos los campos de un producto por ID
export const updateProduct = (id: number, updatedFields: any) => {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updatedFields };
  saveProducts(products);
  return products[index];
};

// Eliminamos un producto por su ID
export const deleteProduct = (id: number) => {
  const products = getAllProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
};