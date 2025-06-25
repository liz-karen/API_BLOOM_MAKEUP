const expressModule = require('express'); // evitamos conflicto de nombre
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/bloom-controllers');

const { validateProduct } = require('../middleware/validate-middleware');

const router = express.Router();

// Ruta para obtener todos los productos o filtrar por nombre
router.get('/', getProducts);

// Ruta para crear un nuevo producto con validación
router.post('/', validateProduct, createProduct);

// Ruta para actualizar un producto existente
router.put('/:id', validateProduct, updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/:id', deleteProduct);

// Exportamos el router con CommonJS
module.exports = router;
