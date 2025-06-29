const expressModule = require('express');

const {
  getAll,
  getById,
  add,
  update,
  remove
} = require('../controllers/bloom-controllers');

const { validateProduct } = require('../middleware/validate-middleware');
const { authenticateToken } = require('../middleware/auth-middleware');

const router = expressModule.Router();

// Obtener todos los productos o filtrar por nombre (si aplicás luego)
router.get('/', getAll);

// Obtener todos el producto indicado por
router.get('/:id', getById);

// Crear un nuevo producto con autenticación y validación
router.post('/', authenticateToken, validateProduct, add);

// Actualizar un producto existente
router.put('/:id', authenticateToken, validateProduct, update);

// Eliminar un producto por ID
router.delete('/:id', authenticateToken, remove);

// Exportamos el router
module.exports = router;
