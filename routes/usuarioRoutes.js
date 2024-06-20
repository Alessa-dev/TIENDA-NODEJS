const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/crear', usuarioController.mostrarFormularioCrearUsuario);
router.post('/', usuarioController.create);
router.get('/', usuarioController.getAll);
router.get('/buscar', usuarioController.buscar);
router.get('/buscar/:id', usuarioController.buscarUsuarioPorId);
router.delete('/:id', usuarioController.delete);
router.get('/editar/:id', usuarioController.mostrarFormularioEdicion);
router.post('/editar/:id', usuarioController.actualizarUsuario);

module.exports = router;

