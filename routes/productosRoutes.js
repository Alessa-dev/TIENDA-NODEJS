const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/crear', productoController.mostrarFormularioCrearProducto);
router.post('/', productoController.create);
router.get('/', productoController.getAll);
router.delete('/:id', productoController.delete);
router.get('/editar/:id', productoController.mostrarFormularioEdicion);
router.post('/editar/:id', productoController.actualizarProducto);
router.get('/buscar', productoController.buscar);
router.get('/buscar/:id', productoController.buscarProductoPorId);

module.exports = router;
