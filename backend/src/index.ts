// Importamos dependencias necesarias
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
import { Request, Response } from 'express';
//require('dotenv').config();
require('dotenv').config({ path: __dirname + '/../.env' });

// Importamos las rutas de productos
const bloomRoutes = require('./routes/bloom-routes');

// Importamos el middleware global de errores
const { errorHandler } = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 3000;


console.log('DEBUG_BLOOM =', process.env.DEBUG_BLOOM);

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Servimos archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Definimos la ruta base para la API de productos
app.use('/api/products', bloomRoutes);

// Ruta raíz que sirve el index.html del frontend
app.get('/', (_req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Middleware global para manejar errores
app.use(errorHandler);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
