const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Mostrar formulario para crear una nueva categoría
router.get('/crear', categoriaController.mostrarFormularioCrearCategoria);

// Crear una nueva categoría
router.post('/', categoriaController.create);

// Obtener todas las categorías
router.get('/', categoriaController.getAll);

// Mostrar formulario para buscar una categoría por ID
router.get('/buscar', categoriaController.buscar);

// Buscar una categoría específica por ID
router.get('/buscar/:id', categoriaController.buscarCategoriaPorId);

// Mostrar formulario para editar una categoría
router.get('/editar/:id', categoriaController.mostrarFormularioEdicion);

// Actualizar una categoría existente
router.post('/editar/:id', categoriaController.actualizarCategoria);

// Eliminar una categoría
router.delete('/:id', categoriaController.delete);

module.exports = router;
