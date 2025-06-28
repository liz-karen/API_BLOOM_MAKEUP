// Importamos dependencias necesarias
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importamos las rutas de productos
const bloomRoutes = require('./routes/bloom-routes');

// Importamos el middleware global de errores
const { errorHandler } = require('./middleware/error-handler');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Servimos archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Definimos la ruta base para la API de productos
app.use('/api/products', bloomRoutes);

// Ruta raíz que sirve el index.html del frontend
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Middleware global para manejar errores
app.use(errorHandler);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
