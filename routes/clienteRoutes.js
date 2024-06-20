const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/crear', clienteController.mostrarFormularioCrearCliente);
router.post('/', clienteController.create);
router.get('/', clienteController.getAll);
router.get('/buscar', clienteController.buscar);
router.get('/buscar/:id', clienteController.buscarClientePorId);
router.delete('/:id', clienteController.delete);
router.get('/editar/:id', clienteController.mostrarFormularioEdicion);
router.post('/editar/:id', clienteController.actualizarCliente);

module.exports = router;

