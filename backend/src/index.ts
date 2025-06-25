// Importamos las dependencias necesarias
const express = require('express');
const cors = require('cors');
const path = require('path');
const bloomRoutes = require('./routes/bloom-routes');

// Inicializamos Express y definimos el puerto
const app = express();
const PORT = 3000;

// Permite peticiones desde otros dominios (CORS)
app.use(cors());

// Permite recibir JSON en las peticiones POST
app.use(express.json());

// Servimos archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas de la API de productos de maquillaje
app.use('/api/products', bloomRoutes);

// Página principal: muestra index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Iniciamos el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
