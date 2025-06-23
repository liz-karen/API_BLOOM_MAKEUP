// Importamos las dependencias necesarias
const express = require('express');              // Framework para manejar rutas y servidor
const cors = require('cors');                    // Middleware para permitir peticiones desde otros orígenes (CORS)
const bodyParser = require('body-parser');       // Permite leer datos del body en peticiones POST (aunque Express ya lo incluye desde v4.16)
const path = require('path');                    // Módulo de Node.js para trabajar con rutas de archivos
const nombreRoutes = require('./routes/nombre-routes'); // Importamos las rutas de contactos

// Inicializamos Express y definimos el puerto
const app = express();
const PORT = 3000;

// === MIDDLEWARES ===
// Permite peticiones desde otros dominios
app.use(cors());

// Permite recibir JSON en las peticiones
app.use(express.json());

// === SERVIR ARCHIVOS ESTÁTICOS DEL FRONT ===
// Esto hace que Express sirva archivos como index.html desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// === RUTAS DE LA API ===
// Todas las rutas que empiecen con /api/nombre se manejarán en nombreRoutes.js
app.use('/api/nombre', nombreRoutes);

// === RUTA POR DEFECTO (SPA o HTML principal) ===
// Si el usuario visita la raíz ("/"), se le envía el archivo index.html del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// === INICIAMOS EL SERVIDOR EN EL PUERTO DEFINIDO ===
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
