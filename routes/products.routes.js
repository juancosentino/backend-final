const express = require('express')
const route = express.Router()
const { check, validationResult, param } = require('express-validator');
const {createProduct, getProduct, getOneProduct, updateProduct, deleteProduct} = require('../controllers/product.controllers')
const multerMiddleware = require('../middlewars/multer');

route.post(
    '/',
    [
      multerMiddleware.single('imagen'),  // Middleware de multer para manejar la carga de imágenes
      check('titulo', 'Campo titulo está vacío').notEmpty(),
      check('precio', 'Campo precio está vacío').notEmpty(),
      check('precio', 'Precio debe ser un número mayor o igual a 0').isFloat({ min: 0 }),
      check('imagen', 'Campo imagen está vacío').notEmpty(),
      check('descripcion', 'Campo descripcion está vacío').notEmpty(),
    ],
    async (req, res) => {
      // Verificar si hay errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Si no hay errores de validación, continuar con la lógica de creación del producto
      createProduct(req, res);
  }
); 

/* route.post('/',multerMiddleware.single('imagen') ,createProduct) */

route.get('/', getProduct)

route.get('/:id', [
  check('id', 'Formato incorrecto de ID').isMongoId(),
], getOneProduct);

route.get('/:id', [
  param('id', 'Formato incorrecto de ID').isMongoId(),
], getOneProduct);

route.put('/:id', [
  param('id', 'Formato incorrecto de ID').isMongoId(),
  check('titulo').optional().notEmpty().withMessage('Campo título está vacío'),
  check('precio').optional().notEmpty().withMessage('Campo precio está vacío').isFloat({ min: 0 }).withMessage('Precio debe ser un número mayor o igual a 0'),
  check('imagen').optional().notEmpty().withMessage('Campo imagen está vacío'),
  check('descripcion').optional().notEmpty().withMessage('Campo descripción está vacío'),
  check('destacado').optional().notEmpty().withMessage('Campo destacado está vacío'),
  check('categoria').optional().notEmpty().withMessage('Campo categoría está vacío'),
], updateProduct);

route.delete('/:id', [
  param('id', 'Formato incorrecto de ID').isMongoId(),
], deleteProduct);

module.exports = route

